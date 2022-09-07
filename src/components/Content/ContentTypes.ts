export type TVariants = [
  '100',
  '200',
  '300',
  'regular',
  '500',
  '600',
  '700',
  '800',
  'italic'
];

export enum ECategory {
  'sans-serif',
  'serif',
  'display',
  'handwriting',
  'monospace',
}

export interface IFont {
  family: String;
  version: String;
  variants: TVariants;
  subsets: Array<String>;
  files: Array<String>;
  lastModified: String;
  category: ECategory;
  kind?: String;
}
