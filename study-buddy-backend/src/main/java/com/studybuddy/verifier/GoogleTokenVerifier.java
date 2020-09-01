package com.studybuddy.verifier;

import java.io.File;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Arrays;
import java.util.Collections;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;

import com.studybuddy.exception.InvalidTokenException;

@Component
public class GoogleTokenVerifier {

  private static final HttpTransport transport = new NetHttpTransport();
  private static final JsonFactory jsonFactory = new JacksonFactory();
  private static final String CLIENT_ID;
  static {
	  System.out.println(new File(".."+File.separator+".."+File.separator+"client_secret_google_studyBuddy2.json").getAbsolutePath());
	  JsonNode cred = null;
	  try {
		cred = new ObjectMapper().readTree(
				  new File("..\\..\\client_secret_google_studyBuddy2.json"));
	  } catch (IOException e1) {
		  // TODO Auto-generated catch block
		  e1.printStackTrace();
	  }
	  CLIENT_ID = cred.get("web").get("client_id").textValue();
  }

  public Payload verify(String idTokenString)
      throws GeneralSecurityException, IOException, InvalidTokenException {
    return GoogleTokenVerifier.verifyToken(idTokenString);
  }

  private static Payload verifyToken(String idTokenString)
      throws GeneralSecurityException, IOException, InvalidTokenException {
    final GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.
        Builder(transport, jsonFactory)
        .setIssuers(Arrays.asList("https://accounts.google.com", "accounts.google.com"))
        .setAudience(Collections.singletonList(CLIENT_ID))
        .build();


    System.out.println("validating:" + idTokenString);

    GoogleIdToken idToken = null;
    try {
    	String[] idTokenString_split = idTokenString.split(" ");
    	String idTokenString_noPrefix = idTokenString_split[idTokenString_split.length-1];
        idToken = verifier.verify(idTokenString_noPrefix);
    } catch (IllegalArgumentException e){
    	System.out.println(e.getMessage());
      // means token was not valid and idToken
      // will be null
    }

    if (idToken == null) {
      throw new InvalidTokenException("idToken is invalid");
    }

    return idToken.getPayload();
  }

}
