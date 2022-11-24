package com.endereco.endereco.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.endereco.endereco.models.Cep;
import com.endereco.endereco.service.ServiceJson;

@Controller
@RequestMapping("/cep")
public class ControllerPostCep {

    ServiceJson out = new ServiceJson();

    @ResponseBody
    @RequestMapping(method = RequestMethod.POST, value = "/salvar", consumes = "application/json")
    public ResponseEntity<?> salvarCep(@RequestBody Cep cep) {

        boolean result = out.escreveJson(cep);

        if (result) {
            return ResponseEntity.ok().body("Cep salvo com sucesso!");
        } else {
            return ResponseEntity.ok().body("Problema para salvar informações na base!");
        }

    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.GET, value = "/buscar")
    public ResponseEntity<?> buscarInformacoes(){

        String listaCeps = out.buscarInformacoes();

        if (listaCeps.equals("")) {
            listaCeps = "vazio";
        }

        return ResponseEntity.ok().body(listaCeps);
    }

}
