# Test-module-4-db

 Data Management System – CRUD with SQL, JavaScript & CSV 
 
 Project Overview
 
This project was developed as part of the performance test for Module 4 (SQL Databases) at Riwi. The goal was to design and implement a complete solution for organizing and managing financial data from Fintech platforms (Nequi and Daviplata), originally stored in disorganized Excel files. The final system includes: 
    • A normalized relational database
    
Mass data import from CSV full CRUD system with frontend dashboardAdvanced SQL queries for business insights 
 Developer Info

 
• Name: Jeronimo Parra Q Clan: Lovelace Email: jeronimopq1611@gmail.com 

 
 Technologies Used

Frontend  HTML, CSS , JavaScript  Backend  Node.js, Express  Database  MySQL  CSV  Postman  Modeling  draw.io  

 Data Normalization

The original Excel file was manually analyzed and normalized using the first three normal forms: 
    
    1. 1NF: Removed repeating groups and ensured atomic values.

2NF: Eliminated partial dependencies by creating separate tables for entities.3NF: Removed transitive dependencies to ensure data integrity. The final relational model includes entities such as: 
    
    • Client

InvoiceTransactionPlatform

 Relational model diagram is included in the repository as a PDF/image
 CSV Data Import
    • Original Excel file was converted to CSV for easier processing.Data was imported using a local script triggered via the frontend.The import process ensures correct mapping and validation of fields.  CSV file included in the repository. --- 
 CRUD System
A complete CRUD system was implemented for the Client entity: 
Create: Add new clients via form or API
Read: Display clients in a dynamic table
Update: Edit client details inline
Delete: Remove clients individually 

 How to Run the Project
    • Clone the repository:
git clone https://github.com/jeropq16/Test-module-4-db.git
cd Test-module-4-db
    2. Set up the database:
        ◦ Run database.sql in your SQL environment
    3. Start the server:
       npm install
       node server.js
    4. Open index.html in your browser to access the dashboard
--- 
 Repository Contents
    • database.sql
    •  DDL scriptmodel.pdf 
    •  Relational model diagram
    • data.csv 
    • HTML, CSS, JS
