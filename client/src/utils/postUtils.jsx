import { faEarthAmericas, faLock, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const getPrivacyIcon = (privacy) => {
    switch (privacy) {
        case 'private':
            return <FontAwesomeIcon icon={faLock} />;
        case 'friends':
            return <FontAwesomeIcon icon={faUserGroup} />;
        default:
            return <FontAwesomeIcon icon={faEarthAmericas} />;
    }
};
