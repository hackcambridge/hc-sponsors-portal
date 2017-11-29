export class EventModel {
    title: string;
    description: string;
}

export class CompetitionModel {
    title: string;
    description: string;
    prizes: string;
}

export class EventsSummaryModel {
    hardwareApiCompetition: CompetitionModel;
    themedCompetition: CompetitionModel;
    sideEvent: EventModel;
}
