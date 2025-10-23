# Testing Guide - Client Management Features

## Overview
The application now has complete client management features including:
- View all saved clients
- Search and filter clients
- View detailed client information
- Edit existing clients
- Regenerate documents
- Autocomplete to load saved clients

## Testing Checklist

### 1. Initial Setup ✓
- [x] Build completes without errors
- [x] Dev server running at http://localhost:5173/
- [x] Firebase connection configured

### 2. Navigation Testing

#### Test Header Navigation
1. **Open the app** at http://localhost:5173/
2. **Check header navigation buttons:**
   - [ ] "New Client" button is visible and highlighted (blue background)
   - [ ] "View Clients" button is visible
   - [ ] Click "View Clients" - should navigate to `/clients`
   - [ ] "View Clients" should now be highlighted
   - [ ] Click "New Client" - should return to home page `/`
   - [ ] "New Client" should now be highlighted

### 3. Create Test Data (if you don't have any clients yet)

1. **Go to New Client form** (/)
2. **Click "Load Sample Data"** to populate the form
3. **Click "📦 Save Complete Estate Plan"** button
4. **Wait for save to complete** - you should see:
   - [ ] Progress indicator showing percentage
   - [ ] Success message with download links
   - [ ] PDF and Word download links appear
5. **Save at least 2-3 test clients** (modify names between saves)

### 4. View Clients Page Testing

#### Navigate to View Clients
1. **Click "View Clients"** in the header
2. **Verify page loads correctly:**
   - [ ] Page title shows "Saved Clients"
   - [ ] Client count is displayed (e.g., "3 clients in database")
   - [ ] "+ New Client" button is visible
   - [ ] Search bar is visible

#### Test Client List Display
3. **Check each client card shows:**
   - [ ] Client name (and spouse name if joint trust)
   - [ ] Trust type badge (Single Trust / Joint Trust)
   - [ ] Document status badges (Complete Plan / Living Trust)
   - [ ] Email and phone (if available)
   - [ ] Trust name
   - [ ] Created and Updated dates
   - [ ] "View Details →" link

#### Test Search Functionality
4. **Test the search bar:**
   - [ ] Type a client's first name - list filters in real-time
   - [ ] Type a client's last name - list filters correctly
   - [ ] Type an email - list filters correctly
   - [ ] Clear search - all clients appear again
   - [ ] Type "xyz" (non-existent) - shows "No clients found"

#### Test Client Card Click
5. **Click on a client card:**
   - [ ] Should navigate to `/client/{clientId}`
   - [ ] Client detail page loads

### 5. Client Detail Page Testing

#### Test Page Content
1. **Verify all sections are displayed:**
   - [ ] "Back to Clients" button at top
   - [ ] Client name in header
   - [ ] Client ID displayed
   - [ ] Action buttons: Edit, Regenerate, Delete

#### Test Client Information Display
2. **Check Trust Information section:**
   - [ ] Trust Type (Single/Joint)
   - [ ] Trust Name
   - [ ] Created date
   - [ ] Last Updated date

3. **Check Client Information section:**
   - [ ] Primary client details (name, email, phone, DOB)
   - [ ] Spouse details (if joint trust)

4. **Check Children section** (if applicable):
   - [ ] Shows count in heading
   - [ ] Lists all children with names and DOB

5. **Check Successor Trustees section** (if applicable):
   - [ ] Shows count in heading
   - [ ] Lists trustees with contact info

#### Test Document Downloads
6. **Check Generated Documents section:**
   - [ ] Shows "Complete Estate Plan" if saved with complete package
   - [ ] Shows "Living Trust" if saved with living trust only
   - [ ] Each document shows PDF and Word download links
   - [ ] Click PDF link - opens in new tab / downloads
   - [ ] Click Word link - downloads .docx file
   - [ ] Generation date is displayed

#### Test Edit Functionality
7. **Test Edit button:**
   - [ ] Click "Edit Client" button
   - [ ] Should navigate back to home page (/)
   - [ ] Form should be pre-filled with client's data
   - [ ] Verify all fields populated correctly
   - [ ] Make a change (e.g., update phone number)
   - [ ] Save again to update

#### Test Regenerate Documents
8. **Test Regenerate Documents:**
   - [ ] Click "Regenerate Documents" button
   - [ ] Confirm dialog appears
   - [ ] Click OK to proceed
   - [ ] Progress bar appears showing:
     - "Updating client information..."
     - "Regenerating PDF document..."
     - "Regenerating Word document..."
     - "Uploading new documents..."
     - "Update complete!"
   - [ ] Success message appears
   - [ ] New document links appear
   - [ ] Try downloading the new documents

#### Test Delete Functionality
9. **Test Delete button:**
   - [ ] Click "Delete Client" button
   - [ ] Confirm dialog appears with warning
   - [ ] Click Cancel - nothing happens
   - [ ] Click Delete again, then OK
   - [ ] Should redirect to View Clients page
   - [ ] Client should no longer appear in list

#### Test Navigation
10. **Test Back button:**
    - [ ] Click "← Back to Clients"
    - [ ] Returns to View Clients page
    - [ ] Client list is still there

### 6. Load Existing Client (Autocomplete) Testing

#### Test Load Client Section
1. **Go to New Client form** (/)
2. **Locate "Load Existing Client" section** at the top
3. **Test autocomplete:**
   - [ ] Type 2 characters of a client's name
   - [ ] Dropdown appears with matching clients
   - [ ] Each suggestion shows:
     - Client name (and spouse if joint)
     - Email
     - Last updated date
     - Trust type badge
     - Document status badges

4. **Test search variations:**
   - [ ] Search by first name - works
   - [ ] Search by last name - works
   - [ ] Search by email - works
   - [ ] Search for spouse name (in joint trust) - works
   - [ ] Partial match works (e.g., "joh" finds "John")
   - [ ] Case-insensitive (e.g., "SMITH" finds "Smith")

5. **Test selection:**
   - [ ] Click on a suggested client
   - [ ] Dropdown closes
   - [ ] Selected client appears in blue box below
   - [ ] "Load Client" button appears
   - [ ] "Clear" button appears

6. **Test loading:**
   - [ ] Click "Load Client" button
   - [ ] Confirmation dialog appears
   - [ ] Click OK
   - [ ] Success message appears
   - [ ] Form is populated with client's data
   - [ ] Verify all fields filled correctly:
     - Client information
     - Spouse information (if joint)
     - Children
     - Trustees
     - All other sections

7. **Test Clear:**
   - [ ] Type and select a client
   - [ ] Click "Clear" button
   - [ ] Search box clears
   - [ ] Selected client preview disappears

### 7. Edge Cases and Error Handling

#### Test Empty States
1. **View Clients with no data:**
   - Delete all clients
   - [ ] Shows "No clients yet" message
   - [ ] "Create First Client" button appears

2. **Search with no results:**
   - [ ] Type "zzzzz" in search
   - [ ] Shows "No clients found"
   - [ ] "Try adjusting your search terms" message

#### Test Loading States
3. **Test loading indicators:**
   - [ ] Saving documents shows progress bar
   - [ ] Regenerating shows progress
   - [ ] Loading clients page shows spinner

#### Test Error Cases
4. **Test with missing data:**
   - [ ] Client with no email displays "N/A"
   - [ ] Client with no documents shows "No documents generated yet"

### 8. Firestore Console Verification

1. **Open Firebase Console:**
   - Go to: https://console.firebase.google.com/project/estate-planning-app-b5335/firestore
   - [ ] Click on "clients" collection
   - [ ] See all saved clients
   - [ ] Click on a client document
   - [ ] Verify data structure matches expected format

2. **Check Storage:**
   - Go to: https://console.firebase.google.com/project/estate-planning-app-b5335/storage
   - [ ] See client folders (organized by client ID)
   - [ ] Each folder contains PDF and Word files
   - [ ] File names include timestamps

### 9. Integration Flow Testing

#### Complete User Journey
1. **New client creation:**
   - [ ] Fill out form manually
   - [ ] Save Complete Estate Plan
   - [ ] Verify success and download links

2. **View the saved client:**
   - [ ] Go to View Clients
   - [ ] Find the new client
   - [ ] Click to view details
   - [ ] Verify all data is correct

3. **Edit and update:**
   - [ ] Click Edit
   - [ ] Modify some data
   - [ ] Save again
   - [ ] Go back to View Clients
   - [ ] Verify "Updated" date changed

4. **Load into new form:**
   - [ ] Go to New Client form
   - [ ] Use autocomplete to find client
   - [ ] Load the client
   - [ ] Verify all data loaded
   - [ ] Make changes and save as new client

## Known Issues / Limitations

1. **Search performance:** For datasets > 100 clients, search may be slow (gets all clients then filters)
2. **File size:** Large PDF files may take time to generate/upload
3. **Firestore limits:** Free tier has quota limits on reads/writes

## Success Criteria

All checkboxes above should be checked ✓ for a successful test!

## Next Steps After Testing

If all tests pass:
1. ✅ Navigate between pages works
2. ✅ Create, view, edit, delete clients works
3. ✅ Search and filter works
4. ✅ Autocomplete works
5. ✅ Document generation and download works
6. ✅ Firebase integration works

The application is ready for production use!

## Reporting Issues

If you find any issues during testing:
1. Note which test failed
2. Check browser console for errors (F12 → Console)
3. Note any error messages
4. Report back with details
