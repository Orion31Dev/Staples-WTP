import React from 'react';
import { IUnitUpdateData } from '../../../../shared/UnitInterfaces';
import { getAccessToken } from '../../oauth/authUtils';
import EmailList from '../EmailList';
import { getUnitData } from '../../dataUtils';

interface UnitSettingsProps {
  unitNum: string;
}

interface UnitSettingsState {
  emails: string[];
}

export default class UnitSettings extends React.Component<UnitSettingsProps, UnitSettingsState> {
  constructor(props: UnitSettingsProps) {
    super(props);

    this.state = {
      emails: [],
    };
  }

  async componentDidMount() {
    this.setState({ emails: (await getUnitData())[this.props.unitNum].members });
  }

  async componentDidUpdate(prevProps: UnitSettingsProps, prevState: UnitSettingsState) {
    if (this.props.unitNum !== prevProps.unitNum) {
      this.setState({ emails: (await getUnitData())[this.props.unitNum].members });
    }

    if (this.state !== prevState && this.props.unitNum === prevProps.unitNum) {
      let data = {} as IUnitUpdateData;

      data.unitId = parseInt(this.props.unitNum);
      data.members = this.state.emails;

      try {
        fetch('/api/update-units', {
          method: 'POST',
          body: JSON.stringify({
            data: data,
          }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAccessToken()}`,
          },
        });
      } catch {}
    }
  }

  render() {
    return (
      <div className="unit-settings">
        <div className="section-header">Members</div>
        <EmailList
          list={this.state.emails}
          setList={(emails) => {
            this.setState({ emails: emails });
          }}
        ></EmailList>
      </div>
    );
  }
}
