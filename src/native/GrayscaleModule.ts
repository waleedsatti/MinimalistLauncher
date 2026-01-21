import {NativeModules} from 'react-native';

interface GrayscaleModuleType {
  enableGrayscale(): Promise<boolean>;
  disableGrayscale(): Promise<boolean>;
  isGrayscaleEnabled(): Promise<boolean>;
  toggleGrayscale(): Promise<boolean>;
}

export const GrayscaleModule: GrayscaleModuleType =
  NativeModules.GrayscaleModule;
