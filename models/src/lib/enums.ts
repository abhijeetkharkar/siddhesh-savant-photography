export enum CarouselType {
  NORMAL,
  LOOP,
  AUTOMATIC,
}

export enum PaginationType {
  NONE,
  PAGE_NUMBER,
  PAGE_NUMBER_TOTAL,
}

export enum CarouselControlPosition {
  DEFAULT,
  FAR_ENDS,
  MID_SCREEN,
}

export enum Breakpoint {
  BREAKPOINT_1 = 20 * 16,
  BREAKPOINT_2 = 23.4375 * 16,
  BREAKPOINT_3 = 30 * 16,
  BREAKPOINT_4 = 42.5 * 16,
  BREAKPOINT_5 = 48 * 16,
  BREAKPOINT_6 = 55 * 16,
  BREAKPOINT_7 = 67.5 * 16,
  BREAKPOINT_8 = 80 * 16,
  BREAKPOINT_9 = 90 * 16,
  BREAKPOINT_10 = 120 * 16,
  BREAKPOINT_11 = 135 * 16,
  BREAKPOINT_12 = 150 * 16,
}

export enum ScreenSize {
  MOBILE,
  TAB,
  DESKTOP,
}

export enum ToggleableComponent {
  HEADER,
  FOOTER,
}

export enum PhotoCategory {
  HOMES_AND_SPACES = '/homesAndSpaces',
  MEGA_PROJECTS = '/megaProjects',
  FEATURED = '/featured',
  HOME_DECOR = '/homeDecor',
}
