package com.studybuddy.service;

import java.util.List;

import com.studybuddy.model.SpreadsheetInfo;

public interface SpreadsheetInfoService {
	
	// Create
	public SpreadsheetInfo createSpreadsheetInfo(SpreadsheetInfo ssInfo);
	// Read
	public SpreadsheetInfo getSpreadsheetInfoBySpreadsheetId(String spreadsheetId);
	public List<SpreadsheetInfo> getSpreadsheetInfoByUserId(String uid);
	public List<SpreadsheetInfo> getSpreadsheetInfoByPublicAccess(boolean publicAccess);
	// Update
	public SpreadsheetInfo updateSpreadsheetInfo(SpreadsheetInfo ssInfo);
	// Delete
	public void deleteSpreadsheetInfo(SpreadsheetInfo ssInfo);
	
	// Exists
	public boolean existsSpreadsheetInfoBySpreadsheetId(String spreadsheetId);

}
