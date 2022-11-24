package com.endereco.endereco.service;

import java.io.File;
import java.io.FileWriter;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import com.endereco.endereco.models.Cep;
import com.google.gson.Gson;

public class ServiceJson {

    File urlAbsoluto = new File("");

    List<Cep> listaDeCeps = new ArrayList<>();

    String url = urlAbsoluto.getAbsolutePath().concat("\\classes\\static\\base\\base.json");

    public boolean escreveJson(Cep cep) {

        listaDeCeps.add(cep);

        String json = new Gson().toJson(listaDeCeps);

        try {

            byte[] bytesJson = json.getBytes("UTF-8");

            String jsonEncodeUTF8 = new String(bytesJson);

            PrintWriter out = new PrintWriter(new FileWriter(url));

            out.write(jsonEncodeUTF8);

            out.close();
             
            return true;
        } catch (Exception e) {
            System.out.println(e.getLocalizedMessage());
            return false;
        }

    }

    public String buscarInformacoes(){

        try {

            String json = String.join(" ",Files.readAllLines(Paths.get(url),StandardCharsets.UTF_8));

            return json;
        } catch (Exception e) {
            return "false";
        }

    }

}
