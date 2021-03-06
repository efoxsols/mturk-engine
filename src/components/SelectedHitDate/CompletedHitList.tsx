import * as React from 'react';
import { connect } from 'react-redux';
import { RootState, HitId } from 'types';
import { List } from 'immutable';
import { ResourceList } from '@shopify/polaris';
import { hitsOnSelectedDateIds } from 'selectors/hitDatabaseDay';
import { DATABASE_RESULTS_PER_PAGE } from 'constants/misc';
import NoActivity from './NoActivity';
import HitDbEntry from '../HitDbEntry/HitDbEntry';

export interface Props {
  readonly hitIds: List<HitId>;
}

export interface OwnProps {
  readonly page: number;
}

class CompletedHitList extends React.PureComponent<Props & OwnProps, never> {
  public render() {
    const { hitIds, page } = this.props;
    const start = DATABASE_RESULTS_PER_PAGE * page;
    const end = start + DATABASE_RESULTS_PER_PAGE;
    const itemsToShow = hitIds.slice(start, end);

    return hitIds.size > 0 ? (
      <ResourceList
        items={itemsToShow.toArray()}
        renderItem={(id: string) => <HitDbEntry id={id} />}
      />
    ) : (
      <NoActivity />
    );
  }
}

const mapState = (state: RootState): Props => ({
  hitIds: hitsOnSelectedDateIds(state)
});

export default connect(mapState)(CompletedHitList);
