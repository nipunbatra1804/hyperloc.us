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
      popInfo: null
    };
  }

  async componentDidMount() {
    try {
      if (this.state.sites.length > 0) {
        console.log("not resrendering");
        return;
      }
      const superMarkets = await getSuperMarkets();
      const clinics = await getClinics();
      const hawkers = await getHawkerCenters();
      console.log(clinics);
      this.setState({ sites: [...clinics, ...superMarkets, ...hawkers] });
    } catch (error) {
      console.log(error);
    }
  }
  handleOptionSelect = option => {
    const finalOption = option.value === "all" ? null : option;
    console.log("handleOptionSelect", finalOption);
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

  /*.sort((first, second) => {
      return first.localeCompare(second);
    });*/
  render() {
    let { sites, options, popInfo } = this.state;

    const filteredSites = this.filterAndSortRestaurantList();
    console.log("explore page re-rendering");
    return (
      <div data-testid="explore-page">
        <Container>
          <Row>
            <Col xs="6">
              {" "}
              <MapGL sites={filteredSites} popUp={popInfo} />
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
