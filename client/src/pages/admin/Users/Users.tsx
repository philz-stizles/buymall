import { ChangeEvent, Component, Context, Fragment } from "react";
import ReactDOM from "react-dom";
import { User } from "../../models/user";
import UserList from "./components/UserList";
import { Button, Input } from "../../components/ui";
import { AuthContext } from "../../context/auth-context";
import ErrorBoundary from "../../components/ui/ErrorBoundary/ErrorBoundary";
import { connect } from "react-redux";
import axios from "axios";
import { baseUrl } from "../../utils/api";
import { IoDownload, IoDownloadOutline, IoPersonAdd } from "react-icons/io5";
import CreateUserModal from "./components/CreateUserModal";

type Props = {};

type State = {
  users: User[];
  isLoading: boolean;
  error: any;
  searchTerm: string;
  isShowing: boolean;
};

class Users extends Component<Props, State> {
  static contextType?: Context<any> | undefined = AuthContext;

  state: State = {
    users: [],
    isLoading: false,
    error: null,
    searchTerm: "",
    isShowing: false,
  };

  // constructor(props: Props) {
  //   super(props)
  //   this.changeHandler = this.changeHandler.bind(this);
  // }

  componentDidMount(): void {
    this.setState({ isLoading: true });
    // axios
    //   .get(`${baseUrl}/users`)
    //   .then((response) => {
    //     this.setState({ users: response.data.data, isLoading: false });
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     this.setState({ error: "Please try again in a bit." });
    //   });
    this.setState({
      users: [
        {
          id: "1",
          name: "Theophilus Ighalo",
          phone: "08060000000",
          email: "theophil@mail.com",
          address: "No 12 somewhere, brick road",
        },
        {
          id: "1",
          name: "Jane Stallone",
          phone: "08030000000",
          email: "janestallone@mail.com",
          address: "No 100 somewhere, cement road",
        },
      ],
    });
  }

  componentDidUpdate(
    prevProps: Readonly<{}>,
    prevState: State,
    snapshot?: any
  ): void {
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.filter(this.state.searchTerm);
    }
  }

  changeHandler(e: ChangeEvent<HTMLInputElement>) {
    this.setState({ searchTerm: e.target.value });
  }

  filter(searchTerm: string) {
    this.setState({
      users: this.state.users.filter((user) => user.name.includes(searchTerm)),
    });
  }

  render() {
    const { users, isShowing } = this.state;

    return (
      <Fragment>
        {isShowing &&
          ReactDOM.createPortal(
            <CreateUserModal
              onClose={() => this.setState({ isShowing: false })}
            />,
            document.getElementById("modal-root") as Element
          )}
        <div className="flex justify-between items-center py-6">
          <h3 className="text-lg font-bold">Users</h3>
          <div className="flex items-center gap-2">
            <Button
              label="New"
              icon={IoPersonAdd}
              onClick={() => this.setState({ isShowing: true })}
            />
            <Button label="Export" icon={IoDownloadOutline} />
          </div>
        </div>
        <ErrorBoundary>
          {/* <Input type="search" onChange={this.changeHandler.bind(this)} /> */}
          <UserList data={users} />
        </ErrorBoundary>
      </Fragment>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
