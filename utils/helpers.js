// Purpose: This file will contain any helper functions that we want to use in multiple files.

// This will be used to format the date to be more readable
module.exports = {
    format_date: date => {
        // Format date as MM/DD/YYYY
        return date.toLocaleDateString();
    }
};