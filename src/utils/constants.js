// Application Constants
export const SUPPORTED_FILE_TYPES = {
  IMAGES: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/bmp', 'image/webp'],
  DOCUMENTS: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
};

export const WCAG_CONTRAST_RATIOS = {
  AAA: 7,
  AA: 4.5,
  AA_LARGE: 3
};

export const FONT_SIZE_OPTIONS = [
  { value: 'small', label: 'Small', size: '14px' },
  { value: 'medium', label: 'Medium', size: '16px' },
  { value: 'large', label: 'Large', size: '18px' },
  { value: 'xlarge', label: 'Extra Large', size: '20px' }
];

export const KEYBOARD_SHORTCUTS = {
  INCREASE_FONT: 'Ctrl + +',
  DECREASE_FONT: 'Ctrl + -',
  TOGGLE_CONTRAST: 'Ctrl + H',
  RESET_SETTINGS: 'Ctrl + 0'
};