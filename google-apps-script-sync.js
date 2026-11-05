/**
 * TWS Sports Day 2026 - Master Realtime Cloud Sync API
 * 
 * Paste this into Google Apps Script (Code.gs)
 */

var PROP = PropertiesService.getScriptProperties();

function doGet(e) {
  try {
    var raw = PROP.getProperty('STUDENT_REGISTRATIONS');
    var registrations = raw ? JSON.parse(raw) : {};
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      data: registrations,
      timestamp: new Date().toISOString()
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);
    var raw = PROP.getProperty('STUDENT_REGISTRATIONS');
    var registrations = raw ? JSON.parse(raw) : {};
    
    // Action 1: Single student update
    if (payload.action === 'update' && payload.studentId) {
      registrations[payload.studentId] = payload.events || [];
      PROP.setProperty('STUDENT_REGISTRATIONS', JSON.stringify(registrations));
    }
    // Action 2: Batch sync / reset
    else if (payload.action === 'batch' && payload.data) {
      registrations = payload.data;
      PROP.setProperty('STUDENT_REGISTRATIONS', JSON.stringify(registrations));
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      studentId: payload.studentId,
      events: payload.events,
      timestamp: new Date().toISOString()
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
