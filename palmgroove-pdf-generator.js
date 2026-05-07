// PDF Generator for PALMGROOVE Subscription Form
// ============================================
// This file contains ONLY the PDF generation code
// Make sure this loads BEFORE palmgroove-form.js

async function generatePDF(data, passportImageData, idDocuments) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // ========================================
    // CUSTOMIZE COLORS HERE - PALMGROOVE THEME
    // ========================================
    const colors = {
        primaryPurple: [107, 44, 107],      // Deep Purple
        primaryMaroon: [139, 34, 82],       // Maroon
        accentGold: [212, 175, 55],         // Gold
        lightPurple: [155, 89, 182],        // Light Purple
        darkPurple: [74, 24, 80],           // Dark Purple
        greenAccent: [74, 124, 78],         // Palm Green
        darkGray: [44, 44, 44],             // Text Gray
        lightGray: [156, 163, 175],         // Light Gray
        white: [255, 255, 255],             // White
        background: [248, 244, 248]         // Light Purple Background
    };

    let yPos = 20;

    // ========================================
    // HEADER SECTION (with gradient)
    // ========================================
    
    // Gradient background (Purple to Maroon)
    for (let i = 0; i < 40; i++) {
        const ratio = i / 40;
        const r = colors.primaryPurple[0] + (colors.primaryMaroon[0] - colors.primaryPurple[0]) * ratio;
        const g = colors.primaryPurple[1] + (colors.primaryMaroon[1] - colors.primaryPurple[1]) * ratio;
        const b = colors.primaryPurple[2] + (colors.primaryMaroon[2] - colors.primaryPurple[2]) * ratio;
        doc.setFillColor(r, g, b);
        doc.rect(0, i, 210, 1, 'F');
    }

    // Add decorative border
    doc.setDrawColor(...colors.accentGold);
    doc.setLineWidth(2);
    doc.rect(5, 5, 200, 35, 'S');

    // Company Name
    doc.setFontSize(28);
    doc.setTextColor(...colors.white);
    doc.setFont(undefined, 'bold');
    doc.text('Palmgroove', 105, 18, { align: 'center' });
    
    // Subtitle
    doc.setFontSize(18);
    doc.text('COOPERATIVE AGRO ESTATE', 105, 27, { align: 'center' });
    
    // Location
    doc.setFontSize(12);
    doc.setTextColor(...colors.accentGold);
    doc.text('ATANI, ANAMBRA STATE', 105, 35, { align: 'center' });

    // Add passport photo if available
    if (passportImageData) {
        try {
            const format = passportImageData.includes('png') ? 'PNG' : 'JPEG';
            doc.addImage(passportImageData, format, 175, 8, 25, 30);
            doc.setDrawColor(...colors.white);
            doc.setLineWidth(0.5);
            doc.rect(175, 8, 25, 30, 'S');
        } catch (error) {
            console.log('Could not add passport photo to PDF');
        }
    }

    yPos = 50;

    // Form Title
    doc.setFillColor(...colors.primaryMaroon);
    doc.rect(10, yPos, 190, 10, 'F');
    doc.setFontSize(14);
    doc.setTextColor(...colors.white);
    doc.setFont(undefined, 'bold');
    doc.text('SUBSCRIPTION FORM', 105, yPos + 7, { align: 'center' });
    
    yPos += 17;

    // ========================================
    // HELPER FUNCTIONS
    // ========================================
    
    function addSectionHeader(title) {
        // Check for page break
        if (yPos > 260) {
            doc.addPage();
            yPos = 20;
        }
        
        // Add some spacing before section
        yPos += 3;
        
        // Gradient header background
        doc.setFillColor(...colors.primaryMaroon);
        doc.rect(10, yPos, 190, 12, 'F');
        
        // Add decorative line on left
        doc.setFillColor(...colors.accentGold);
        doc.rect(10, yPos, 3, 12, 'F');
        
        doc.setFontSize(11);
        doc.setTextColor(...colors.white);
        doc.setFont(undefined, 'bold');
        doc.text(title, 18, yPos + 8);
        
        yPos += 17;
        doc.setTextColor(...colors.darkGray);
    }

    function addField(label, value, fullWidth = false) {
        // Check if we need a new page
        if (yPos > 265) {
            doc.addPage();
            yPos = 20;
        }

        // Alternate background for rows
        const rowHeight = fullWidth ? 12 : 7;
        if (Math.floor((yPos - 50) / 7) % 2 === 0) {
            doc.setFillColor(...colors.background);
            doc.rect(10, yPos - 4, 190, rowHeight, 'F');
        }

        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(...colors.primaryPurple);
        doc.text(label + ':', 15, yPos);
        
        doc.setFont(undefined, 'normal');
        doc.setTextColor(...colors.darkGray);
        const valueText = String(value || 'N/A');
        
        if (fullWidth) {
            const splitText = doc.splitTextToSize(valueText, 170);
            doc.text(splitText, 15, yPos + 5);
            yPos += 5 + (splitText.length * 5);
        } else {
            // Truncate if too long
            const maxWidth = 110;
            const truncated = doc.splitTextToSize(valueText, maxWidth);
            doc.text(truncated[0], 80, yPos);
            yPos += 7;
        }
    }

    function addCheckmark(isChecked) {
        if (isChecked) {
            doc.setTextColor(...colors.primaryMaroon);
            return 'Yes';
        }
        return 'No';
    }

    // ========================================
    // PERSONAL INFORMATION
    // ========================================
    addSectionHeader('PERSONAL INFORMATION');
    
    addField('Title', data.personal.title);
    addField('Full Name', data.personal.fullName);
    addField('Full Address', data.personal.fullAddress, true);
    addField('Office Address', data.personal.officeAddress, true);
    addField('Nationality', data.personal.nationality);
    addField('Date of Birth', data.personal.dob);
    addField('GSM Number', data.personal.gsmNumber);
    addField('Email Address', data.personal.email);
    addField('ID Type', data.personal.idType);

    yPos += 5;

    // ========================================
    // ID DOCUMENTS SECTION
    // ========================================
    
    // Check if any ID documents were uploaded
    if (data.personal.idType && data.personal.idType !== 'N/A') {
        addSectionHeader('IDENTIFICATION DOCUMENTS');
        
        // Split ID types by comma
        const idTypes = data.personal.idType.split(',');
        
        for (let rawKey of idTypes) {
            // Clean spaces from the key
            const idKey = rawKey.trim();
            
            // Check if this ID was uploaded
            if (idDocuments && idDocuments[idKey] && idDocuments[idKey].data) {
                try {
                    yPos += 5;
                    
                    // Check if we need a new page
                    if (yPos > 200) {
                        doc.addPage();
                        yPos = 20;
                    }
                    
                    // Add ID document label
                    doc.setFontSize(10);
                    doc.setFont(undefined, 'bold');
                    doc.setTextColor(...colors.primaryPurple);
                    doc.text(idKey.replace(/_/g, ' ') + ' Document:', 15, yPos);
                    yPos += 7;
                    
                    const file = idDocuments[idKey];
                    
                    // Add the image
                    if (file.type && file.type.startsWith('image/')) {
                        const format = file.type.includes('png') ? 'PNG' : 'JPEG';
                        doc.addImage(file.data, format, 15, yPos, 180, 100);
                        doc.setDrawColor(...colors.lightGray);
                        doc.setLineWidth(1);
                        doc.rect(15, yPos, 180, 100, 'S');
                        yPos += 108;
                    } else if (file.name) {
                        // For PDF files, show filename
                        doc.setFont(undefined, 'normal');
                        doc.setTextColor(...colors.darkGray);
                        doc.setFontSize(9);
                        doc.text('PDF Document: ' + file.name, 15, yPos);
                        yPos += 10;
                    }
                    
                } catch (error) {
                    console.error('Error adding ID document to PDF:', error);
                }
            }
        }
        
        yPos += 5;
    }

    // ========================================
    // NEXT OF KIN
    // ========================================
    addSectionHeader('NEXT OF KIN');
    
    addField('Name', data.nextOfKin.name);
    addField('Relationship', data.nextOfKin.relationship);
    addField('Phone Number', data.nextOfKin.phone);

    yPos += 5;

    // ========================================
    // REFERRAL DETAILS
    // ========================================
    if (data.referral.name !== 'N/A') {
        addSectionHeader('REFERRAL DETAILS');
        addField('Name', data.referral.name);
        addField('Email', data.referral.email);
        addField('Phone Number', data.referral.phone);
        yPos += 5;
    }

    // ========================================
    // DECLARATION
    // ========================================
    addSectionHeader('DECLARATION');
    
    addField('Declaration Agreed', addCheckmark(data.declaration.agreed));
    addField('Name', data.declaration.name);
    addField('Date', data.declaration.date);

    yPos += 5;

    // ========================================
    // PURCHASE DETAILS
    // ========================================
    addSectionHeader('PURCHASE DETAILS');
    
    addField('Number of Plots', data.purchase.numberOfPlots);
    addField('Plot Size', data.purchase.plotSize);
    addField('Plot Type', data.purchase.plotType);
    addField('Payment Plan', data.purchase.paymentPlan);
    addField('Property Confirmation', addCheckmark(data.purchase.confirmed));

    yPos += 5;

    // ========================================
    // PAGE 2 - PROPERTY INFO/TERMS
    // ========================================
    doc.addPage();
    yPos = 20;

    // Header on page 2
    doc.setFillColor(...colors.primaryPurple);
    doc.rect(0, 0, 210, 35, 'F');
    doc.setFontSize(24);
    doc.setTextColor(...colors.accentGold);
    doc.setFont(undefined, 'bold');
    doc.text('Palmgroove', 105, 22, { align: 'center' });
    
    yPos = 45;

    // Property Info Header
    doc.setFillColor(...colors.primaryMaroon);
    doc.rect(10, yPos, 190, 10, 'F');
    doc.setFontSize(12);
    doc.setTextColor(...colors.white);
    doc.text('PROPERTY INFO / TERMS OF PURCHASE', 105, yPos + 7, { align: 'center' });
    
    yPos += 17;

    // Bank Details Section
    doc.setFontSize(11);
    doc.setTextColor(...colors.primaryMaroon);
    doc.setFont(undefined, 'bold');
    doc.text('BANK DETAILS', 15, yPos);
    yPos += 7;

    doc.setFontSize(10);
    doc.setTextColor(...colors.darkGray);
    doc.setFont(undefined, 'normal');
    doc.text('Account Name: MAX CONSTRUCTION HOUSING COOP', 15, yPos);
    yPos += 6;
    doc.text('Account Number: 5402057281', 15, yPos);
    yPos += 6;
    doc.text('Bank: Providus Bank', 15, yPos);
    yPos += 12;

    // Property Information
    const propertyInfo = [
        {
            title: 'LOCATION',
            text: 'Atani, along Ozubulu-Atani road'
        },
        {
            title: 'WHO ARE THE OWNERS OF PALMGROOVE AGRIC ESTATE?',
            text: 'This estate is owned by FARM COUNTRY INT. and promoted by MAXCOOP'
        },
        {
            title: 'WHAT TITLE DOES PALMGROOVE AGRIC ESTATE HAVE?',
            text: 'This estate is covered by a registered survey plan and the Agric title is in view'
        },
        {
            title: 'WHAT ARE THE OTHER PAYMENTS?',
            text: 'Registered survey N350,000, Deed of Assignment N175,000, Plots demarcation N100,000, Bush Clearing N200,000, Development levy N500,000'
        },
        {
            title: 'WHAT DOCUMENTS DO I GET?',
            text: '1. Payment receipts, 2. Allocation letter, 3. Farm management agreement, 4. Registered Survey plan, 5. Architecture drawings for 2/3bedroom farm house.'
        },
        {
            title: 'WHAT ARE THE CROPS CULTIVATED AND WHAT ARE THE GAINS FOR ME?',
            text: 'Rice and Palm trees are the two main crops for this project, and you can make up to 50% of the value of the land annually'
        },
        {
            title: 'WHAT ARE YOUR RESELL TERMS AND REFUND POLICY?',
            text: 'We do not resell for clients. You would have to do that yourself. We charge 15% of the resale value to transfer allocation. In the case of a refund, we charge 40% of the total amount paid as charges.'
        }
    ];

    propertyInfo.forEach(item => {
        // Check for page break
        if (yPos > 250) {
            doc.addPage();
            yPos = 20;
        }

        // Title
        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(...colors.primaryPurple);
        doc.text(item.title, 15, yPos);
        yPos += 5;

        // Text
        doc.setFont(undefined, 'normal');
        doc.setTextColor(...colors.darkGray);
        const splitText = doc.splitTextToSize(item.text, 180);
        doc.text(splitText, 15, yPos);
        yPos += (splitText.length * 5) + 5;
    });

    // Office Addresses
    yPos += 5;
    if (yPos > 200) {
        doc.addPage();
        yPos = 20;
    }

    doc.setFontSize(11);
    doc.setTextColor(...colors.primaryMaroon);
    doc.setFont(undefined, 'bold');
    doc.text('PWAN MAX OFFICES', 105, yPos, { align: 'center' });
    yPos += 8;

    const offices = [
        {
            name: 'ONITSHA OFFICE',
            address: 'NO 207 UGWUNABANKPA ROAD, BEHIND MAINLAND AND FILLING STATION, SERVE OIL JUNCTION, ONITSHA.'
        },
        {
            name: 'AWKA OFFICE',
            address: '1ST FLOOR, GRACE & FAITH HOUSE, BESIDE UBA BANK, ONITSHA-ENUGU EXPRESSWAY AWKA, ANAMBRA STATE.'
        },
        {
            name: 'NNEWI OFFICE',
            address: '1ST FLOOR, 8 EDEMEZEWI, OPP. POLARIS BANK, BANK ROAD, NNEWI, ANAMBRA STATE.'
        }
    ];

    offices.forEach(office => {
        if (yPos > 260) {
            doc.addPage();
            yPos = 20;
        }

        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(...colors.primaryPurple);
        doc.text(office.name, 15, yPos);
        yPos += 5;

        doc.setFont(undefined, 'normal');
        doc.setTextColor(...colors.darkGray);
        const splitAddress = doc.splitTextToSize(office.address, 180);
        doc.text(splitAddress, 15, yPos);
        yPos += (splitAddress.length * 4) + 6;
    });

    // ========================================
    // FOOTER ON EACH PAGE
    // ========================================
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        
        // Footer background
        doc.setFillColor(...colors.primaryPurple);
        doc.rect(0, 280, 210, 17, 'F');
        
        // Submission date
        doc.setFontSize(8);
        doc.setTextColor(...colors.white);
        doc.text('Submitted on: ' + data.submissionDate, 105, 286, { align: 'center' });
        
        // Page number
        doc.setTextColor(...colors.accentGold);
        doc.setFont(undefined, 'bold');
        doc.text(`Page ${i} of ${pageCount}`, 105, 292, { align: 'center' });
    }

    // Convert to blob
    return doc.output('blob');
}

// Make function globally available
window.generatePDF = generatePDF;
