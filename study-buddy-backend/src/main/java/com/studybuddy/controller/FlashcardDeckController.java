package com.studybuddy.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.studybuddy.model.FlashcardDeck;
import com.studybuddy.service.FlashcardDeckService;
import com.studybuddy.service.SpreadsheetInfoService;

@RestController
public class FlashcardDeckController {
	
	private FlashcardDeckService fds;
	private SpreadsheetInfoService ssis;
	
	@Autowired
	public FlashcardDeckController(FlashcardDeckService fds, SpreadsheetInfoService ssis) {
		this.fds = fds;
		this.ssis = ssis;
	}
	
	// CREATE
	
	@PostMapping("/flashcardDeck")
	public FlashcardDeck createFlashcardDeck(@RequestBody FlashcardDeck fDeck) {
		if (!this.ssis.existsSpreadsheetInfoBySpreadsheetId(
				fDeck.getSpreadsheetInfo().getSpreadsheetId())) {
			ssis.createSpreadsheetInfo(fDeck.getSpreadsheetInfo());
		}
		return fds.createFlaschardDeck(fDeck);
	}
	
	// READ
	
	@GetMapping("/flashcardDeck/{fid}")
	public FlashcardDeck getFlashcardDeckByFid(@PathVariable int fid, HttpServletRequest request, HttpServletResponse response) throws IOException {
		FlashcardDeck fDeck = fds.getFlashcardDeckByFid(fid);
		if (fDeck == null) {
			response.sendError(404, "No flashcard deck found with id "+fid);
			return null;
		}
		if (!fDeck.getUser().getUid().equals((String) request.getAttribute("userId"))) {
			response.sendError(403, "Logged in user cannot access flashcard deck "+fid);
			return null;
		}
		return fDeck;
	}
	
	@GetMapping("/flashcardDecks")
	public List<FlashcardDeck> getFlashcardDecksByUserId(HttpServletRequest request, HttpServletResponse response) throws IOException {
		List<FlashcardDeck> fDecks = fds.getFlashcardDecksByUid(
				(String) request.getAttribute("userId"));
		return fDecks==null ? new ArrayList<FlashcardDeck>() : fDecks;
	}
	
	@GetMapping("/flashcardDecks/{ssid}")
	public List<FlashcardDeck> getFlashcardDecksBySpreadsheetIdOwnedByUid(@PathVariable String ssid, HttpServletRequest request, HttpServletResponse response) throws IOException {
		List<FlashcardDeck> fDecks = fds.getFlashcardDecksBySpreadsheetIdOwnedByUid(
				ssid, (String) request.getAttribute("userId"));
		return fDecks;
	}
	
	// UPDATE
	
	@PutMapping("/flashcardDeck")
	public FlashcardDeck updateFlashcardDeck(@RequestBody FlashcardDeck fDeck) {
		if (!this.ssis.existsSpreadsheetInfoBySpreadsheetId(
				fDeck.getSpreadsheetInfo().getSpreadsheetId())) {
			ssis.createSpreadsheetInfo(fDeck.getSpreadsheetInfo());
		}
		return fds.createFlaschardDeck(fDeck);
	}
	
	// DELETE
	
	@DeleteMapping("/flashcardDeck/{fid}")
	public void deleteFlashcardDeck(@PathVariable int fid, HttpServletRequest request, HttpServletResponse response) throws IOException {
		FlashcardDeck fDeck = fds.getFlashcardDeckByFid(fid);
		if (fDeck == null) {
			response.sendError(404, "No flashcard deck found with id "+fid);
		}
		else if (!fDeck.getUser().getUid().equals((String) request.getAttribute("userId"))) {
			response.sendError(403, "Logged in user cannot access flashcard deck "+fid);
		} else {
			fds.deleteFlashcardDeck(fDeck);
		}
	}
	
	@DeleteMapping("/flashcardDecks")
	public void deleteFlashcardDecksForUser(HttpServletRequest request, HttpServletResponse response) throws IOException {
		List<FlashcardDeck> fDeckList = fds.getFlashcardDecksByUid((String) request.getAttribute("userId"));
		if (fDeckList == null || fDeckList.size() == 0) {
			response.sendError(404, "No flashcard decks found belonging to logged in user");
		} else {
			fds.deleteFlashcardDecks(fDeckList);
		}
	}

}
