import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { graphql, Query } from 'react-apollo';
import { ActivityIndicator, Dimensions, Platform } from 'react-native';
import Swiper from 'react-native-swiper';
import styled from 'styled-components/native';
import constituencySvgs from '../../../../../assets/constituencies';
// Components
import GermanySvgComponent from '../../../../../assets/svgs/GermanySVG';
import ChartLegend from '../../../../components/Charts/ChartLegend';
import PieChart from '../../../../components/Charts/PieChart';
// GraphQL
import GET_CONSTITUENCY from '../../../../graphql/queries/local/constituency';
import VOTES from '../../../../graphql/queries/votes';
import Segment from '../../Segment';

export const { width, height } = Dimensions.get('window');

const RepresentativeText = styled.Text`
  color: rgb(142, 142, 147);
  text-align: center;
  font-size: 10;
  padding-top: 18;
`;

const PieChartWrapper = styled.View`
  align-self: center;
  padding-horizontal: 36;
  width: 100%;
  max-width: ${() =>
    Math.min(400, Dimensions.get('window').width, Dimensions.get('window').height)};
`;

const SvgWrapper = styled.View`
  position: absolute;
  right: 0;
`;

class CommunityVoteResults extends Component {
  renderCommuntiyResult = comunnityResults => {
    if (
      comunnityResults &&
      (comunnityResults.yes || comunnityResults.no || comunnityResults.abstination)
    ) {
      const votes = comunnityResults.yes + comunnityResults.no + comunnityResults.abstination;
      const data = [
        {
          label: 'Zustimmungen',
          percent: comunnityResults.yes / votes,
          color: '#15C063',
          value: comunnityResults.yes,
        },
        {
          label: 'Enthaltungen',
          percent: comunnityResults.abstination / votes,
          color: '#2C82E4',
          value: comunnityResults.abstination,
        },
        {
          label: 'Ablehnungen',
          percent: comunnityResults.no / votes,
          color: '#EC3E31',
          value: comunnityResults.no,
        },
      ];

      const DynSvgComp = !comunnityResults.constituency
        ? GermanySvgComponent
        : constituencySvgs[comunnityResults.constituency].default;

      return (
        <PieChartWrapper key={comunnityResults.constituency ? 'goverment' : 'constituency'}>
          <SvgWrapper>
            <DynSvgComp
              width={60}
              height={36}
              childProps={{ fill: 'none', stroke: '#000', strokeWidth: '1%' }}
            />
          </SvgWrapper>
          <PieChart data={data} label="Abstimmende" subLabel={votes} />
          <ChartLegend data={data} />
        </PieChartWrapper>
      );
    }
    return <ActivityIndicator />;
  };

  render() {
    const { scrollTo, procedure, data } = this.props;
    if (data.loading) {
      return null;
    }
    const constituencies =
      data.constituency && data.constituency.constituency ? [data.constituency.constituency] : [];
    return (
      <Query
        query={VOTES}
        variables={{ procedure, constituencies }}
        fetchPolicy="cache-and-network"
      >
        {({ data: voteData, loading }) => {
          if (loading || !voteData || !voteData.votes.voted) {
            return null;
          }
          const screens = [this.renderCommuntiyResult(voteData.votes.voteResults)];
          if (constituencies.length > 0 && voteData.votes.voteResults.constituencies[0]) {
            screens.push(this.renderCommuntiyResult(voteData.votes.voteResults.constituencies[0]));
          }
          return (
            <Segment title="Communityergebnis" open scrollTo={scrollTo} fullWidth>
              <Swiper
                loop={false}
                style={{
                  height: Platform.OS === 'ios' ? 'auto' : 430,
                  maxHeight: 430,
                }}
                paginationStyle={{ bottom: 14 }}
              >
                {screens}
              </Swiper>
              <RepresentativeText>
                Dieses Ergebnis wurde nicht auf seine Repräsentativität überprüft.
              </RepresentativeText>
            </Segment>
          );
        }}
      </Query>
    );
  }
}

CommunityVoteResults.propTypes = {
  scrollTo: PropTypes.func.isRequired,
  data: PropTypes.shape().isRequired,
  procedure: PropTypes.string.isRequired,
};

CommunityVoteResults.defaultProps = {};

export default graphql(GET_CONSTITUENCY, {
  options: {
    fetchPolicy: 'no-cache',
  },
})(CommunityVoteResults);
