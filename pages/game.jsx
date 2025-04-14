import React from 'react';
import enTranslations from '@shopify/polaris/locales/en.json';
import {
  AppProvider, Box, TextField, Layout, LegacyCard, Page, Tabs, TextContainer, LegacyStack,
  Button, Collapsible, RangeSlider, Banner, InlineGrid
} from '@shopify/polaris';
import {useState, useCallback, useEffect} from 'react';
import '@shopify/polaris/build/esm/styles.css';
import {ChartVerticalFilledIcon} from "@shopify/polaris-icons";

const defaultPlayerNames = (numPlayers) => {
  const x = {};
  for (let i = 0; i < numPlayers; i++) {
    x[i] = `Player ${i + 1}`;
  }
  return x
}

const defaultPlayerScores = (numPlayers) => {
  const x = {};
  for (let i = 0; i < numPlayers; i++) {
    x[i] = {};
  }
  return x
}

export default function Game() {
  const [numPlayers, setNumPlayers] = useState(4);

  const [playerNames, setPlayerNames] = useState(defaultPlayerNames(numPlayers));
  const [open, setOpen] = useState(false);
  const [openNames, setOpenNames] = useState(true);
  const handleToggle = useCallback(() => setOpen((open) => !open), []);
  const [playerScores, setPlayerScores] = useState(defaultPlayerScores(numPlayers));

  useEffect(() => {
    setPlayerNames(defaultPlayerNames(numPlayers))
    setPlayerScores(defaultPlayerScores(numPlayers))
  }, [numPlayers]);

  const [selected, setSelected] = useState(0);
  const handleTabChange = useCallback((selectedTabIndex) => setSelected(selectedTabIndex), [],);

  const tabs = [
      {
        id: '6-cards',
        title: '2 groups (3 cards with the same number)',
        content: '6 cards',
        panelID: '6-cards',
      }, {
        id: '7-cards',
        title: '1 group (3 cards with the same number) 1 run (4 consecutive cards same suit)',
        content: '7 cards',
        panelID: '7-cards',
      }, {
      id: '8-cards', title: '2 runs (4 consecutive cards same suit)',
      content: '8 cards',
      panelID: '8-cards',
    }, {
      id: '9-cards',
      title: '3 groups (3 cards with the same number)',
      content: '9 cards',
      panelID: '9-cards',
    }, {
      id: '10-cards',
      title: '1 run (4 consecutive cards same suit) 2 groups (3 cards with the same number). Must go out on the full',
      content: '10 cards',
      panelID: '10-cards',
    }, {
      id: '11-cards',
      title: '2 run (4 consecutive cards same suit) 1 groups (3 cards with the same number)',
      content: '11 cards',
      panelID: '11-cards',
    }, {
      id: '12-cards',
      title: '3 run (4 consecutive cards same suit) OR 4 groups (3 cards with the same number)',
      content: '12 cards',
      panelID: '12-cards',
    },
  ];
  return <AppProvider i18n={enTranslations}>
    <Page fullWidth>
      <Layout>
        <Layout.Section variant="oneThird">

          <Box maxWidth={'90%'}>
            <LegacyCard
                sectioned
                title={<InlineGrid columns="1fr auto">
                      <span>Game setup</span>
                  <Button
                      variant="micro"
                      disclosure={openNames ? 'up' : 'down'}
                      onClick={() => setOpenNames((openNames) => !openNames)}
                      ariaExpanded={openNames}
                      ariaControls="basic-collapsible"><br/>
                  </Button>
                </InlineGrid>}
            >

              <Collapsible
                  open={openNames}
                  id="basic-collapsible"
                  transition={{duration: '500ms', timingFunction: 'ease-in-out'}}
                  expandOnPrint
              >
                <RangeSlider
                    output
                    label="Number of players"
                    min={2}
                    max={10}
                    step={1}
                    value={numPlayers}
                    onChange={setNumPlayers}
              />
                {[...Array(numPlayers)].map((_, index) => (<TextField
                    key={index}
                    value={playerNames[index]}
                    onChange={(value) => setPlayerNames({...playerNames, [index]: value})}
                    label={`Player ${index + 1} name`}
                  autoComplete={"off"}
                />))}
              </Collapsible>
            </LegacyCard>
          </Box>
        </Layout.Section>
        <Layout.Section>
          <Box maxWidth={'90%'}>
            <LegacyCard sectioned title="">
              <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
                <LegacyCard.Section
                    title={<Banner onDismiss={() => {
                    }}><p>{tabs[selected].title}</p></Banner>}
                >
                  {[...Array(numPlayers)].map((_, index) => (
                  <TextField
                      key={index}
                      value={playerScores[index] ? playerScores[index][tabs[selected].id] : ""}
                      onChange={(value) => setPlayerScores({
                        ...playerScores,
                        [index]: {...playerScores[index], [tabs[selected].id]: Number(value)}
                      })}
                      label={playerNames[index] + " score"}
                      autoComplete={"off"}
                  />))}
                    <LegacyStack vertical>
                      <Button
                          onClick={handleToggle}
                          ariaExpanded={open}
                          ariaControls="basic-collapsible"
                          disclosure={open ? 'up' : 'down'}
                          icon={<ChartVerticalFilledIcon/>}
                      >Scores
                      </Button>
                      <Collapsible
                          open={open}
                          id="basic-collapsible"
                          transition={{duration: '500ms', timingFunction: 'ease-in-out'}}
                          expandOnPrint
                      >
                        <TextContainer>
                          {Object.entries(playerScores).map(([playerNameIndex, playerScore]) => (
                              <p key={playerNameIndex}>
                                {playerNames[playerNameIndex]} score: {Object.values(playerScore).reduce((accumaltor, curr) => accumaltor
                                  + curr, 0)}
                              </p>))}
                        </TextContainer>
                      </Collapsible>
                    </LegacyStack>
                </LegacyCard.Section>
              </Tabs>
            </LegacyCard>
          </Box>
        </Layout.Section>
      </Layout>


    </Page>

  </AppProvider>
}