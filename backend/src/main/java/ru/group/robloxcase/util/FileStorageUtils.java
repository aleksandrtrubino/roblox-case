package ru.group.robloxcase.util;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;

public class FileStorageUtils {

    public static byte[] saveFile(MultipartFile file, String directory, String fileName){
        Path path = Path.of(directory);
        Path filePath = path.resolve(fileName);
        try {
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return findFile(directory, fileName);
    }

    public static byte[] saveFile(byte[] imageData, String directory, String fileName) {
        Path path = Paths.get(directory);
        Path filePath = path.resolve(fileName);
        try {
            Files.write(filePath, imageData, StandardOpenOption.CREATE);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return findFile(directory, fileName);
    }

    public static byte[] findFile(String directory, String fileName){
        Path path = Paths.get(directory + fileName);
        byte[] fileBytes;
        try {
            fileBytes = Files.readAllBytes(path);
        } catch (IOException e) {
            throw new RuntimeException("image not loaded");
        }
        return fileBytes;
    }

    public static boolean isFileExist(String directory, String fileName){
        File file = new File(directory + fileName);
        return file.exists() && !file.isDirectory();
    }

    public static boolean deleteFile(String directory, String fileName) {
        Path path = Paths.get(directory, fileName);
        try {
            return Files.deleteIfExists(path);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
