import React from "react";
import {
  InputGroup,
  InputGroupAddon,
  Input,
  CustomInput,
  Badge
} from "reactstrap";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={4} defaultCenter={{ lat: 40.4637, lng: 3.7492 }}>
    {props.isMarkerShown && (
      <Marker
        position={{ lat: 40.4637, lng: 3.7492 }}
        onClick={props.onMarkerClick}
      />
    )}
  </GoogleMap>
));

class UserPage extends React.PureComponent {
  state = {
    isMarkerShown: false
  };

  componentDidMount() {
    this.delayedShowMarker();
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true });
    }, 3000);
  };

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false });
    this.delayedShowMarker();
  };

  render() {
    return (
      <div>
        <MyMapComponent
          isMarkerShown={this.state.isMarkerShown}
          onMarkerClick={this.handleMarkerClick}
        />
        <div style={{ margin: "50px 0" }}>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <h3>
                <Badge>From</Badge>
              </h3>
            </InputGroupAddon>
            <Input />
          </InputGroup>
          <InputGroup>
            <Input />
            <InputGroupAddon>
              <h3>
                <Badge>To</Badge>
              </h3>
            </InputGroupAddon>
          </InputGroup>
        </div>
        <div>
          <CustomInput
            type="radio"
            id="exampleCustomRadio"
            name="customRadio"
            label="Click to save this route"
          />
        </div>
      </div>
    );
  }
}

export default UserPage;
