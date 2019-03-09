import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import MapGL from "../MapGL/MapGL";
import FilterMenu from "../FilterMenu/FilterMenu";
import { getSuperMarkets } from "../../services/serviceSuperMarkets";
import { getHawkerCenters } from "../../services/serviceHawkers";
import { getClinics } from "../../services/serviceClinics";
import PinTable from "../PinTable/PinTable";
export default class ExplorePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sites: [],
      options: [
        { name: "All", value: "all" },
        { name: "Clinics", value: "clinics" },
        { name: "Hawker Center", value: "hawkerCentre" },
        { name: "Supermarket", value: "supermarket" }
      ],
      selectedOption: null,
      popInfo: null,
      currentPosition: {
        latitude: null,
        longitude: null
      }
    };
  }

  async componentDidMount() {
    try {
      if (this.state.sites.length > 0) {
        return;
      }
      const superMarkets = await getSuperMarkets();
      const clinics = await getClinics();
      const hawkers = await getHawkerCenters();
      this.setState({ sites: [...clinics, ...superMarkets, ...hawkers] });
      if (!(this.props.match.params.long && this.props.match.params.lat)) {
        this.geolocation();
      } else {
        this.updateViewsAndStates();
      }
    } catch (error) {
      console.log(error);
    }
  }
  handleOptionSelect = option => {
    const finalOption = option === null ? this.state.options[0] : option;
    this.setState({
      selectedOption: finalOption
    });
  };
  handlePinTableClick = element => {
    this.setState({ popInfo: element });
  };
  handleTableLeave = () => {
    this.setState({ popInfo: null });
  };
  filterAndSortRestaurantList = () => {
    const { sites, selectedOption } = this.state;
    console.log(selectedOption);
    let filteredByOption = selectedOption
      ? sites.filter(site => selectedOption.value.includes(site.type))
      : sites;

    return filteredByOption;
  };
  geolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.updatePosition);
    }
  };
  updatePosition = position => {
    console.log(position);
    const currentPosition = { ...this.state.currentPosition };
    currentPosition.longitude = position.coords.longitude;
    currentPosition.latitude = position.coords.latitude;
    this.setState({ currentPosition: currentPosition });
  };

  updateViewsAndStates = () => {
    if (!(this.props.match.params.long && this.props.match.params.lat)) {
      return;
    }
    const { long, lat, search } = this.props.match.params;
    console.log(long, lat, search);
    const currentPosition = { ...this.state.currentPosition };
    const { options } = this.state;
    const selectedOption = options.find(elem => elem.value === search);
    currentPosition.longitude = parseFloat(long);
    currentPosition.latitude = parseFloat(lat);

    this.setState({
      currentPosition: currentPosition,
      selectedOption: selectedOption
    });
  };

  render() {
    let { sites, options, popInfo, currentPosition } = this.state;
    const filteredSites = this.filterAndSortRestaurantList();

    return (
      <div data-testid="explore-page">
        <Container>
          <Row>
            <Col xs="6">
              {" "}
              <MapGL
                sites={filteredSites}
                popUp={popInfo}
                position={currentPosition}
              />
            </Col>
            <Col xs="6">
              <FilterMenu
                options={options}
                selected={this.state.selectedOption}
                handleClick={this.handleOptionSelect}
              />
              <PinTable
                pins={filteredSites}
                handleClick={this.handlePinTableClick}
                handleMouseLeave={this.handleTableLeave}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
