import { ALLOWED_FIELDS } from '../config/ALLOWED_FIELDS.js';
import { badRequestResponse } from '../utils/responseHelper.js';

export const filterAllowedFields = (type) => {
    return (req, res, next) => {
        const allowed = ALLOWED_FIELDS[type];
        const filtered = {};

        for (const field of allowed) {
            const value = req.body[field];
            // Accept empty string (''), only ignore undefined
            if (value !== undefined) {
                filtered[field] = value;
            }
        }

        // Check specifically for firstName and lastName
        const isFirstNameEmpty = !filtered.firstName?.trim();
        const isLastNameEmpty = !filtered.lastName?.trim();

        if (isFirstNameEmpty && isLastNameEmpty) {
            return badRequestResponse(res, 'Please provide at least First Name or Last Name.');
        }

        req.filteredBody = filtered;
        next();
    };
};
