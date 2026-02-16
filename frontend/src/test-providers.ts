import { Provider } from '@angular/core';
import { provideHttpClientTesting } from '@angular/common/http/testing';

const testProviders: Provider[] = [provideHttpClientTesting()];
export default testProviders;
