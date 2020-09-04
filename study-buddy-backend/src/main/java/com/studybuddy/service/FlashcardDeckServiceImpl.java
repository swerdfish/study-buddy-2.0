package com.studybuddy.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.studybuddy.model.FlashcardDeck;
import com.studybuddy.model.SpreadsheetInfo;
import com.studybuddy.model.User;
import com.studybuddy.repository.FlashcardDeckRepo;
import com.studybuddy.repository.SpreadsheetInfoRepo;
import com.studybuddy.repository.UserRepo;

@Service
public class FlashcardDeckServiceImpl implements FlashcardDeckService {
	
	private FlashcardDeckRepo fdr;
	private SpreadsheetInfoRepo ssir;
	private UserRepo usrr;
	
	@Autowired
	public FlashcardDeckServiceImpl(FlashcardDeckRepo fdr, SpreadsheetInfoRepo ssir, UserRepo usrr) {
		this.fdr = fdr;
		this.ssir = ssir;
		this.usrr = usrr;
	}

	// CREATE
	
	@Override
	public FlashcardDeck createFlaschardDeck(FlashcardDeck fDeck) {
		System.out.println("out");
		System.out.println(fDeck);
		return fdr.save(fDeck);
	}

	// READ
	
	@Override
	public FlashcardDeck getFlashcardDeckByFid(int fid) {
		return fdr.findById(fid).get();
	}

	@Override
	public List<FlashcardDeck> getFlashcardDecksByUid(String uid) {
		return fdr.findByUser_Uid(uid);
	}

	@Override
	public List<FlashcardDeck> getFlashcardDecksBySpreadsheetId(String spreadsheetId) {
		return fdr.findBySpreadsheetInfo_SpreadsheetId(spreadsheetId);
	}
	
	@Override
	public List<FlashcardDeck> getFlashcardDecksBySpreadsheetIdOwnedByUid(String spreadsheetId, String uid) {
		Optional<SpreadsheetInfo> ssiOpt = ssir.findById(spreadsheetId);
		Optional<User> usrOpt = usrr.findById(uid);
		if (!ssiOpt.isPresent() || !usrOpt.isPresent()) return new ArrayList<FlashcardDeck>();
		return fdr.findBySpreadsheetInfoAndUser(ssiOpt.get(), usrOpt.get());
	}

	// UPDATE
	
	@Override
	public FlashcardDeck updateFlashcardDeck(FlashcardDeck fDeck) {
		return fdr.save(fDeck);
	}

	// DELETE
	
	@Override
	public void deleteFlashcardDeck(FlashcardDeck fDeck) {
		fdr.delete(fDeck);
	}

	@Override
	public void deleteFlashcardDecks(List<FlashcardDeck> fDeckList) {
		for (FlashcardDeck fDeck : fDeckList) {
			fdr.delete(fDeck);
		}
	}

}
