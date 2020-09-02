package com.studybuddy.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.studybuddy.model.SpreadsheetInfo;
import com.studybuddy.model.User;

@Repository
public interface SpreadsheetInfoRepo extends JpaRepository<SpreadsheetInfo, String> {
	
	public List<SpreadsheetInfo> findByUser(User user);
	public List<SpreadsheetInfo> findByPublicAccess(boolean publicAccess);

}
