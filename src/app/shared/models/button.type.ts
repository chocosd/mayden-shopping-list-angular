import { SemanticVariant, Size } from './utils.type';

export type ButtonVariant = SemanticVariant | 'clear';
export type ButtonSize = Omit<Size, 'xs' | 'xl'>;
export type ButtonType = 'button' | 'submit' | 'reset';
