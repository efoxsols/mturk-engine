import { Map } from 'immutable';
import { ToastrState } from 'react-redux-toastr';

export interface RootState {
  readonly tab: number;
  readonly queue: QueueMap;
  readonly search: SearchResults;
  readonly toastr: ToastrState;
  readonly requesters: TurkopticonMap;
  readonly searchingActive: boolean;
  readonly waitingForMturk: boolean;
  readonly searchFormActive: boolean;
  readonly timeNextSearch: Date | null;
  readonly searchOptions: SearchOptions;
  readonly sortingOption: SortingOption;
  readonly hitBlocklist: HitBlockMap;
  readonly requesterBlockList: RequesterBlockMap
}

export type SearchResults = Map<string, SearchResult>;
export type QueueMap = Map<string, QueueItem>;
export type TurkopticonMap = Map<string, TOpticonData>;
export type HitBlockMap = Map<string, BlockedHit>;
export type RequesterBlockMap = Map<string, TOpticonData>

export type SearchSort = 'Latest' | 'Batch Size' | 'Reward';
export interface SearchOptions {
  readonly delay: string;
  readonly minReward: string;
  readonly sortType: SearchSort;
  readonly qualified: boolean;
}

export type SortingOption = 'Batch Size' | 'Reward' | 'Latest';

export interface HumanIntelligenceTask {
  readonly title: string;
  readonly requesterName: string;
  readonly requesterId: string;
  readonly reward: string;
  readonly groupId: string;
  readonly batchSize: number;
  readonly turkopticon?: TOpticonData;
  readonly qualified: boolean;
  readonly description: string;
  readonly timeAllotted: string;
}

export interface SearchResult extends HumanIntelligenceTask {
  readonly index: number;
  readonly expanded?: boolean;
}

export interface QueueItem {
  readonly title: string;
  readonly requesterName: string;
  readonly hitId: string;
  readonly reward: string;
  readonly timeLeft: string;
}

export interface BlockedHit extends HumanIntelligenceTask {
  readonly dateBlocked: Date;
}

export interface TOpticonData {
  readonly name: string;
  readonly attrs: RequesterScores;
  readonly reviews: number;
  readonly tos_flags: number;
}

export interface RequesterScores {
  readonly comm?: string;
  readonly pay?: string;
  readonly fair?: string;
  readonly fast?: string;
}

