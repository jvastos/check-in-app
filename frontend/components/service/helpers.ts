import { REACT_APP_API_URL_DEV, REACT_APP_API_URL } from '@env';
import { Platform } from 'react-native';

const chooseAPI_URL = (environment: string | undefined) => {
	switch (environment) {
		case 'development':
			if (Platform.OS === 'android') {
				return REACT_APP_API_URL;
			}
			return REACT_APP_API_URL_DEV;
		case 'test':
			return REACT_APP_API_URL_DEV;
		case 'production':
			return REACT_APP_API_URL;
		case undefined:
			return undefined;
	}
};
export const API_URL = chooseAPI_URL(process.env.NODE_ENV);
