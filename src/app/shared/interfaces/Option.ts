export interface Option {
    label: string; //displayed with chip
    id: string | number; // identifier
    isHidden?: boolean; // used only to filter results
}