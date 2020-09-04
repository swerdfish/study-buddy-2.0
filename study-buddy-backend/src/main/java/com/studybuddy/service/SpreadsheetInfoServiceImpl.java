package com.studybuddy.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.studybuddy.model.SpreadsheetInfo;
import com.studybuddy.repository.SpreadsheetInfoRepo;

@Service
public class SpreadsheetInfoServiceImpl implements SpreadsheetInfoService {
	
	private SpreadsheetInfoRepo ssiRepo;
	
	@Autowired
	public SpreadsheetInfoServiceImpl(SpreadsheetInfoRepo ssiRepo) {
		this.ssiRepo = ssiRepo;
	}

	// CREATE
	
	@Override
	public SpreadsheetInfo createSpreadsheetInfo(SpreadsheetInfo ssInfo) {
		return ssiRepo.save(ssInfo);
	}

	// READ
	
	@Override
	public SpreadsheetInfo getSpreadsheetInfoBySpreadsheetId(String spreadsheetId) {
		return ssiRepo.findById(spreadsheetId).get();
	}

	@Override
	public List<SpreadsheetInfo> getSpreadsheetInfoByUserId(String uid) {
		return ssiRepo.findByUser_Uid(uid);
	}

	@Override
	public List<SpreadsheetInfo> getSpreadsheetInfoByPublicAccess(boolean publicAccess) {
		return ssiRepo.findByPublicAccess(publicAccess);
	}

	// UPDATE
	
	@Override
	public SpreadsheetInfo updateSpreadsheetInfo(SpreadsheetInfo ssInfo) {
		return ssiRepo.save(ssInfo);
	}

	// DELETE
	
	@Override
	public void deleteSpreadsheetInfo(SpreadsheetInfo ssInfo) {
		ssiRepo.delete(ssInfo);
	}

	// EXISTS
	
	@Override
	public boolean existsSpreadsheetInfoBySpreadsheetId(String spreadsheetId) {
		return ssiRepo.findById(spreadsheetId).isPresent();
	}

}
