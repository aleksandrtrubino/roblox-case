package ru.group.robloxcase.email;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;
import ru.group.robloxcase.exception.NotFoundException;
import ru.group.robloxcase.user.User;
import ru.group.robloxcase.user.UserRepository;

import java.security.Key;
import java.util.Date;

@Service
public class EmailConfirmationServiceImpl implements EmailConfirmationService {

    private static final String DEFAULT_ENCODING = "UTF-8";
    private static final String EMAIL_SUBJECT = "Подтверждение почты";

    @Value("${security.key}")
    private String secretKey;
    @Value("${security.expiration.email-confirmation}")
    public int emailConfirmationExpiration;
    @Value("${app.site}")
    private String host;

    private JavaMailSender mailSender;
    private SpringTemplateEngine templateEngine;
    private EmailConfirmationRepository emailConfirmationRepository;

    public EmailConfirmationServiceImpl(JavaMailSender mailSender, SpringTemplateEngine templateEngine, EmailConfirmationRepository emailConfirmationRepository) {
        this.mailSender = mailSender;
        this.templateEngine = templateEngine;
        this.emailConfirmationRepository = emailConfirmationRepository;
    }

    @Override
    public Void sendEmail(String email) {
        String token = generateToken(email);
        String emailConfirmationUrl = generateEmailConfirmationUrl(token);
        String htmlMessage = generateHtmlMessage(emailConfirmationUrl);
        try {
            sendHtmlEmail(htmlMessage, email);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
        return null;
    }

    @Override
    public Void confirmEmail(String token) {
        String email = getEmailFromToken(token);
        EmailConfirmation emailConfirmation = emailConfirmationRepository.findByEmail(email)
                .orElseThrow(()->new NotFoundException(String.format("EmailConfirmation with email %1$s not found", email)));
        emailConfirmation.setIsConfirmed(true);
        emailConfirmationRepository.save(emailConfirmation);
        return null;
    }

    private void sendHtmlEmail(String html, String to) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, DEFAULT_ENCODING);
        helper.setTo(to);
        helper.setSubject(EMAIL_SUBJECT);
        helper.setText(html, true);
        mailSender.send(message);
    }

    private String generateEmailConfirmationUrl(String token){
        return "http://localhost:3000/email-confirmation?token=" + token;
    }

    private String generateHtmlMessage(String emailConfirmationUrl){
        Context context = new Context();
        context.setVariable("emailConfirmationUrl", emailConfirmationUrl);
        String html = templateEngine.process("email-confirmation", context);
        return html;
    }

    private String generateToken(String email) {
        return Jwts
                .builder()
                .setSubject(email)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + emailConfirmationExpiration))
                .signWith(signingKey())
                .compact();
    }

    private String getEmailFromToken(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(signingKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    private Key signingKey() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey));
    }

}
