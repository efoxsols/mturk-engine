import { Callout, Intent } from '@blueprintjs/core';
import { Layout } from '@shopify/polaris';
import * as React from 'react';
import { connect } from 'react-redux';
import { blockListsAreEmpty } from 'selectors/blocklists';
import { RootState } from '../../types';
import EmptyBlockList from './EmptyBlockList';
import HitBlockList from './HitBlockList';
import RequesterBlockList from './RequesterBlockList';

interface Props {
  readonly empty: boolean;
  // readonly blockedHitIds: Set<GroupId>;
  // readonly blockedRequesterIds: Set<RequesterId>;
}

class BlockLists extends React.Component<Props, never> {
  public render() {
    return this.props.empty ? (
      <EmptyBlockList />
    ) : (
      <Layout>
        <Layout.Section>
          <RequesterBlockList now={new Date()} />
        </Layout.Section>
        <Layout.Section>
          <HitBlockList now={new Date()} />
        </Layout.Section>
        <Layout.Section>
          <Callout intent={Intent.SUCCESS} icon="info-sign">
            Large blocklists do not slow down Mturk Engine. Feel free to grow
            them as large as you like.
          </Callout>
        </Layout.Section>
      </Layout>
    );
  }
}

const mapState = (state: RootState): Props => ({
  empty: blockListsAreEmpty(state)
  // blockedHitIds: hitBlocklistIds(state),
  // blockedRequesterIds: requesterBlocklistIds(state)
});

export default connect(mapState)(BlockLists);
