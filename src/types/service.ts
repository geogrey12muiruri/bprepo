export type Service = {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly href?: string;
    readonly image: string;
    readonly video?: string;
    readonly poster?: string;
    readonly isDisabled?: boolean;
    readonly statusMessage?: string;
};
