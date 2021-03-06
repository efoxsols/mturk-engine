import { createSelector } from 'reselect';
import {
  Watcher,
  WatcherMap,
  RootState,
  WatcherFolderMap,
  GroupId
} from '../types';
import { watchersSelector, watcherFoldersSelector } from './index';
import { Map, Set } from 'immutable';
import { DEFAULT_WATCHER_FOLDER_ID } from '../constants/misc';
import { watcherDefaults } from '../utils/watchers';

/**
 * For backwards compatibility. Legacy watchers won't have certain properties.
 * Here we ensure they do.
 */
const updateLegacyWatchers = createSelector(
  [watchersSelector, watcherFoldersSelector],
  (watchers: WatcherMap, folders: WatcherFolderMap): WatcherMap =>
    watchers.reduce(
      (acc: WatcherMap, cur: Watcher) =>
        acc.set(cur.groupId, {
          ...watcherDefaults,
          ...cur,
          folderId: folders.has(cur.folderId)
            ? cur.folderId
            : DEFAULT_WATCHER_FOLDER_ID
        }),
      Map<GroupId, Watcher>()
    )
);

export const normalizedWatchers = createSelector(
  [watchersSelector, updateLegacyWatchers],
  (allWatchers: WatcherMap, legacyWatchers: WatcherMap): WatcherMap =>
    allWatchers.merge(legacyWatchers)
);

export const watcherIdsSet = createSelector(
  [normalizedWatchers],
  (watchers: WatcherMap) =>
    watchers.reduce(
      (acc: Set<GroupId>, watcher: Watcher) => acc.add(watcher.groupId),
      Set([])
    )
);

export const watcherTitlesMap = createSelector(
  [normalizedWatchers],
  (watchers: WatcherMap) =>
    watchers.reduce(
      (acc: Map<GroupId, string>, watcher: Watcher) =>
        acc.set(watcher.groupId, watcher.title),
      Map<GroupId, string>()
    )
);

export const getWatcher = (id: string) => (state: RootState) =>
  normalizedWatchers(state).get(id);
