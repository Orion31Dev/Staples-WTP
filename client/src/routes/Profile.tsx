import { TokenPayload } from 'google-auth-library';
import React from 'react';
import Tabs from '../components/Tabs';
import { getUserInfo } from '../oauth/authUtils';
import '../styles/routes/Admin.scss';

interface ProfileProps {
  match: any;
}

enum ProfileTab {
  NONE,
  UNIT,
}

interface ProfileState {
  tabIndex: number;
  user?: TokenPayload | null;
}

export default class Profile extends React.Component<ProfileProps, ProfileState> {
  constructor(props: ProfileProps) {
    super(props);
    this.state = {
      tabIndex: ProfileTab.NONE,
      user: undefined,
    };
  }

  componentDidMount() {
    getUserInfo().then(user => {
      this.setState({ user });
    });
  }

  render() {
    if (!this.state.user) return this.NoAccessPage();

    return (
      <div className="section admin">
        <div
          className="title"
          onClick={() => {
            this.setState({ tabIndex: ProfileTab.NONE });
          }}
        >
          
        </div>
        <div className="tabs flex">
          {Tabs(Object.keys(ProfileTab), this.state.tabIndex, (tab: number) => this.setState({ tabIndex: tab }))}
        </div>
      </div>
    );
  }

  private NoAccessPage() {
    return (
      <div className="section profile">
        <div className="no-access">
          <div className="title">You are not logged in</div>
        </div>
      </div>
    );
  }
}

export async function HasAdminAccess() {
  let info = await getUserInfo();

  return (info && info.sub) === process.env.REACT_APP_ADMIN_SUB;
}
