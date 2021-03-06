import "./styles.css";
import "@patternfly/react-core/dist/styles/base.css";
import './fonts.css';

import React, { useEffect, useState } from "react";
import PokemonCard from './PokemonCard';
import pokeball from "./pokeball.png";

import {
  Avatar,
  Brand,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonVariant,
  Dropdown,
  Card,
  CardBody,
  DataList,
  DataListAction,
  DataListCell,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
  Toolbar,
  ToolbarItem,
  ToolbarContent,
  ToolbarToggleGroup,
  ToolbarGroup,
  Divider,
  Drawer,
  DrawerActions,
  DrawerCloseButton,
  DrawerContent,
  DrawerContentBody,
  DrawerHead,
  DrawerPanelBody,
  DrawerPanelContent,
  DropdownToggle,
  DropdownItem,
  DropdownSeparator,
  Flex,
  FlexItem,
  Gallery,
  GalleryItem,
  InputGroup,
  KebabToggle,
  Nav,
  NavItem,
  NavList,
  Page,
  PageHeader,
  PageSection,
  PageSectionVariants,
  PageSidebar,
  Progress,
  Select,
  SelectOption,
  SkipToContent,
  Stack,
  StackItem,
  Text,
  TextContent,
  TextInput,
  Title
} from "@patternfly/react-core";
import axios from "axios";

const getURL = "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0/";
const monURLFragment = 'https://pokeapi.co/api/v2/pokemon/';
const imgURLFragment = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

export default function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [showDrawer, toggleDrawer] = useState(false);
  const [displayMon, setDisplayMon] = useState({});
  const [displayMonDex, setDisplayMonDex] = useState('');
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(getURL).then((res) => {
      setPokemonList(res.data.results);
    });
  });

  const selectMon = (id) => {
    setLoading(true);
    const tempURL = monURLFragment + id;
    axios.get(tempURL).then((res) => {
      setDisplayMon(res.data);
      setLoading(false);
    });
    const speciesURL = 'https://pokeapi.co/api/v2/pokemon-species/' + id;
    axios.get(speciesURL).then((res) => {
      if (res.data.flavor_text_entries[0].language.name === "en")
     { setDisplayMonDex(res.data.flavor_text_entries[0].flavor_text);}
     else {
       setDisplayMonDex(res.data.flavor_text_entries[1].flavor_text);
     }
     
    });
    toggleDrawer(true);
  }

  const closeDrawer = () => {
    toggleDrawer(false);
  }

  const panelContent = (
      <DrawerPanelContent>
        <DrawerHead>
          <DrawerActions>
            <DrawerCloseButton onClick={closeDrawer} />
          </DrawerActions>
        </DrawerHead>
        <DrawerPanelBody>
          <PokemonCard pokemon={displayMon} dex={displayMonDex} isLoading={isLoading} />
          </DrawerPanelBody>
      </DrawerPanelContent>
    );

  return (
    <div className="App">
      
      <Page>
        <PageSection variant={PageSectionVariants.dark} id="header">
          <Flex direction={{ default: "row" }} alignItems={{default: 'alignItemsCenter'}} flexWrap={{default: 'nowrap'}}>
            <FlexItem>
            <img src={pokeball} />
            </FlexItem>
            <FlexItem>
              <TextContent>
            <Text component="h1">PatternFly Pokémon Browser</Text>
            <Text component="p">Click a Pokémon to learn more about it!</Text>
            <Text component="small">
           Powered by {" "}
            <a
              href="https://pokeapi.co/"
              target="_blank"
              rel="noopener noreferrer"
            >
              PokéAPI
            </a> and <a
              href="https://www.patternfly.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              PatternFly
            </a> | Created by <a
              href="https://patrickvhessman.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Patrick Hessman
            </a> | <a
              href="https://github.com/PatrickVHessman/patternfly-pokemon/"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Source
            </a>
            </Text>
            
          </TextContent>
            </FlexItem>
          </Flex>
          
        </PageSection>
        <Divider component="div" />
        
        
        
      </Page>
      <PageSection variant={PageSectionVariants.light} padding={{ default: 'noPadding' }}>
      <Drawer isExpanded={showDrawer} position="right" isInline="false">
          <DrawerContent panelContent={panelContent} >

            <div id="dex">
           <DataList 
        aria-label="data list"
       
        onSelectDataListItem={selectMon}
        >
          {pokemonList.map((mon, index) => {
            const imgURL = imgURLFragment + (index + 1) + '.png';
            
            return (
              <DataListItem key={mon.name} id={index + 1} >
            <DataListItemRow >
              
            <DataListCell key="primary content" className="pf-m-page-insets">
              <Flex direction={{ default: "row" }} alignItems={{default: 'alignItemsCenter'}}>
                <FlexItem>
                  <Avatar src={imgURL} alt={mon.name} />
                </FlexItem>
                <FlexItem>
                  <p>{index + 1}. <span style={{textTransform: 'capitalize'}}>{mon.name}</span></p>
                </FlexItem>
                
              </Flex>
            </DataListCell>
          </DataListItemRow>
          </DataListItem>);
        })}
        </DataList> 
        </div>
         </DrawerContent>
        </Drawer>
        </PageSection>
      
    </div>
  );
}
