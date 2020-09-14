package com.studybuddy.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.studybuddy.exception.InvalidPermissionsException;
import com.studybuddy.exception.ResourceNotFoundException;
import com.studybuddy.model.FlashcardDeck;
import com.studybuddy.service.FlashcardDeckService;
import com.studybuddy.service.SpreadsheetInfoService;

@RestController
@CrossOrigin
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
	public FlashcardDeck createFlashcardDeck(@RequestBody FlashcardDeck fDeck, HttpServletResponse response) {
		if (!this.ssis.existsSpreadsheetInfoBySpreadsheetId(
				fDeck.getSpreadsheetInfo().getSpreadsheetId())) {
			ssis.createSpreadsheetInfo(fDeck.getSpreadsheetInfo());
		}
		response.setStatus(HttpStatus.CREATED.value());
		return fds.createFlashcardDeck(fDeck);
	}
	
	@PostMapping("/flashcardDecks")
	public List<FlashcardDeck> createFlashcardDecks(@RequestBody List<FlashcardDeck> fDecks, HttpServletResponse response) {
		List<FlashcardDeck> createdDecks = new ArrayList<>();
		for (FlashcardDeck fDeck : fDecks) {
			if (!this.ssis.existsSpreadsheetInfoBySpreadsheetId(
					fDeck.getSpreadsheetInfo().getSpreadsheetId())) {
				ssis.createSpreadsheetInfo(fDeck.getSpreadsheetInfo());
			}
			FlashcardDeck createdDeck = fds.createFlashcardDeck(fDeck);
			createdDecks.add(createdDeck);
		}
		response.setStatus(HttpStatus.CREATED.value());
		return fds.createFlashcardDecks(fDecks);
	}
	
	// READ
	
	@GetMapping("/flashcardDeck/{fdid}")
	public FlashcardDeck getFlashcardDeckByFdid(@PathVariable int fdid, HttpServletRequest request, HttpServletResponse response) throws IOException {
		FlashcardDeck fDeck = fds.getFlashcardDeckByFdid(fdid);
		if (fDeck == null) {
			response.sendError(404, "No flashcard deck found with id "+fdid);
			return null;
		}
		String userId = (String) request.getAttribute("userId");
		System.out.println(userId);
		if (!fDeck.getUser().getUid().equals((String) request.getAttribute("userId"))) {
			throw new InvalidPermissionsException(
					"Logged in user cannot access flashcard deck "+fdid);
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
	public FlashcardDeck updateFlashcardDeck(@RequestBody FlashcardDeck fDeck, HttpServletRequest request, HttpServletResponse response) throws IOException {
		int fdid = fDeck.getFdid();
		String userId = (String) request.getAttribute("userId");
		if (!this.fds.existsByFdid(fdid)) {
			throw new ResourceNotFoundException(
					"UPDATE ABORTED: Could not find deck with id "+fDeck.getFdid()+" to update. Consider creating it instead.");
		}
		if (this.fds.getFlashcardDeckByFdid(fdid).getUser().getUid() != userId) {
			throw new InvalidPermissionsException(
					"UPDATE ABORTED: Logged in user cannot access flashcard deck "+fdid);
		}
		if (!this.ssis.existsSpreadsheetInfoBySpreadsheetId(
				fDeck.getSpreadsheetInfo().getSpreadsheetId())) {
			ssis.createSpreadsheetInfo(fDeck.getSpreadsheetInfo());
		}
		return fds.updateFlashcardDeck(fDeck);
	}
	
	@PutMapping("/flashcardDecks")
	public List<FlashcardDeck> updateFlashcardDecks(@RequestBody List<FlashcardDeck> fDecks, HttpServletRequest request, HttpServletResponse response) {
		List<FlashcardDeck> decksToUpdate = new ArrayList<>();
		String userId = (String) request.getAttribute("userId");
		for (FlashcardDeck fDeck : fDecks) {
			int fdid = fDeck.getFdid();
			if (!this.fds.existsByFdid(fdid)) {
				throw new ResourceNotFoundException(
						"UPDATE ABORTED: Could not find deck with id "+fDeck.getFdid()+" to update. Consider creating it instead. No decks were updated.");
			}
			if (this.fds.getFlashcardDeckByFdid(fdid).getUser().getUid() != userId) {
				throw new InvalidPermissionsException(
						"UPDATE ABORTED: Logged in user cannot access flashcard deck "+fdid+". No decks were updated.");
			}
			if (!this.ssis.existsSpreadsheetInfoBySpreadsheetId(
					fDeck.getSpreadsheetInfo().getSpreadsheetId())) {
				ssis.createSpreadsheetInfo(fDeck.getSpreadsheetInfo());
			}
			decksToUpdate.add(fDeck);
		}
		response.setStatus(HttpStatus.CREATED.value());
		return fds.updateFlashcardDecks(decksToUpdate);
	}
	
	// DELETE
	
	@DeleteMapping("/flashcardDeck/{fdid}")
	public void deleteFlashcardDeck(@PathVariable int fdid, HttpServletRequest request, HttpServletResponse response) throws IOException {
		FlashcardDeck fDeck = fds.getFlashcardDeckByFdid(fdid);
		if (fDeck == null) {
			response.sendError(404, "No flashcard deck found with id "+fdid);
		}
		else if (!fDeck.getUser().getUid().equals((String) request.getAttribute("userId"))) {
			response.sendError(403, "Logged in user cannot access flashcard deck "+fdid);
		} else {
			fds.deleteFlashcardDeck(fDeck);
			response.setStatus(204);
		}
	}
	
	@DeleteMapping("/flashcardDecks")
	public void deleteFlashcardDeck(@RequestBody List<Integer> fdids, HttpServletRequest request, HttpServletResponse response) throws IOException {
		List<FlashcardDeck> fDeckList = new ArrayList<>();
		for (int fdid : fdids) {
			if (!fds.existsByFdid(fdid)) {
				response.sendError(404, "DELETE ABORTED: No flashcard deck with id "+fdid+" found. No decks were deleted.");
				return;
			} else {
				FlashcardDeck fDeck = fds.getFlashcardDeckByFdid(fdid);
				if (fDeck.getUser().getUid().equals((String) request.getAttribute("userId"))) {
					fDeckList.add(fDeck);
				} else {
					response.sendError(403, "DELETE ABORTED: Flashcard deck with id "+fdid+" found, but does not belong to logged in user. No decks were deleted.");
					return;
				}
			}
		}
		fds.deleteFlashcardDecks(fDeckList);
		response.setStatus(204);
	}
	
	@DeleteMapping("/flashcardDecks/user")
	public void deleteFlashcardDecksForUser(HttpServletRequest request, HttpServletResponse response) throws IOException {
		List<FlashcardDeck> fDeckList = fds.getFlashcardDecksByUid((String) request.getAttribute("userId"));
		if (fDeckList == null || fDeckList.size() == 0) {
			response.sendError(404, "DELETE ABORTED: No flashcard decks found belonging to logged in user");
		} else {
			fds.deleteFlashcardDecks(fDeckList);
			response.setStatus(204);
		}
	}

}
