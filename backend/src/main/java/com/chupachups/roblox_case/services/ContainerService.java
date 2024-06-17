package com.chupachups.roblox_case.services;

import com.chupachups.roblox_case.dtos.container.ContainerCreateDto;
import com.chupachups.roblox_case.dtos.container.ContainerInfoDto;
import com.chupachups.roblox_case.dtos.container.ContainerUpdateDto;
import com.chupachups.roblox_case.exceptions.ResourceAlreadyExist;
import com.chupachups.roblox_case.mappers.ContainerMapper;
import com.chupachups.roblox_case.models.ContainerEntity;
import com.chupachups.roblox_case.repositories.ContainerRepository;
import com.chupachups.roblox_case.repositories.PetRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ContainerService {
    private final ContainerRepository containerRepository;
    private final PetRepository petRepository;
    private final ContainerMapper containerMapper;

    public List<ContainerInfoDto> getCases(){
        return containerRepository.findAll().stream().map(containerMapper::toDto).toList();
    }

    public ContainerInfoDto getCase(long id){
        return containerMapper.toDto(
                containerRepository.findById(id).orElseThrow(
                        () -> new EntityNotFoundException("Container with id " + id + " not found")
                )
        );
    }

    public ContainerInfoDto createCase(ContainerCreateDto createDto) {
        if (containerRepository.existsByName(createDto.name())) {
            throw new ResourceAlreadyExist("Container with name " + createDto.name() + " already exists");
        }
        if(createDto.cost().compareTo(BigDecimal.ZERO)<=0){
            throw new IllegalArgumentException("Invalid cost for create");
        }
        if(createDto.name().trim().isEmpty()){
            throw new IllegalArgumentException("Invalid case name for create");
        }
        return containerMapper.toDto(
                containerRepository.save(
                        ContainerEntity.builder()
                                .name(createDto.name())
                                .cost(createDto.cost())
                                .build()
                )
        );
    }

    public ContainerInfoDto updateCase(long id, ContainerUpdateDto updateDto){
        final var c = containerRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Container with id " + id + " not found")
        );
        if(updateDto.name()!=null){
            if(containerRepository.existsByName(updateDto.name())||updateDto.name().trim().isEmpty()){
                throw new IllegalArgumentException("Invalid container name for update");
            }
            c.setName(updateDto.name());
        }
        if(updateDto.cost()!=null){
            if(updateDto.cost().compareTo(BigDecimal.ZERO)<=0){
                throw new IllegalArgumentException("Invalid cost for update");
            }
            c.setCost(updateDto.cost());
        }
        return containerMapper.toDto(c);
    }

    public String deleteCase(long id) {
        if (!containerRepository.existsById(id)) {
            throw new EntityNotFoundException("Container with id " + id + " not found");
        }
        System.out.println("Deleting container with id " + id);
        containerRepository.deleteById(id);
        return "Container with id " + id + " deleted";
    }

    public ContainerInfoDto addPetToCase(long caseId, long petId){
        final var pet = petRepository.findById(petId).orElseThrow(
                ()->new EntityNotFoundException("Pet with id " + petId + " not found")
        );
        final var c= containerRepository.findById(caseId).orElseThrow(
                ()->new EntityNotFoundException("Container with id " + caseId + " not found")
        );
        c.getPets().add(pet);
        return containerMapper.toDto(c);
    }

    public ContainerInfoDto removePetFromCase(long caseId, long petId){
        final var pet = petRepository.findById(petId).orElseThrow(
                ()->new EntityNotFoundException("Pet with id " + petId + " not found")
        );
        final var c= containerRepository.findById(caseId).orElseThrow(
                ()->new EntityNotFoundException("Container with id " + caseId + " not found")
        );
        pet.getCases().remove(c);
        return containerMapper.toDto(c);
    }

}
