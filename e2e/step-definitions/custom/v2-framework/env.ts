import * as e2econfig from '../../../config/e2e.conf.json';
import { setDefaultTimeout } from 'cucumber';

setDefaultTimeout(e2econfig.testsConfigurationVariables.allScriptsTimeout);
