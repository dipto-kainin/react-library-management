import React from 'react'
import {Box, Tab, TabPanels, TabPanel, TabList, Tabs, Text } from "@chakra-ui/react"
import ReturnReq from '../components/BorrowReturnReqList/ReturnReq'
import BorrowBookReqList from '../components/BorrowReturnReqList/BorrowReq'
const AdminPortal = () => {
  return (
      <Box
        bg="rgba(0,0,0,0.123)"
        borderRadius="xl"
        w="90vw"
        style={{ backdropFilter: "blur(15px) brightness(80%)" }}
        textColor="aquamarine"
      >
        <Text textAlign='center' fontSize="3em">Admin Portal</Text>
        <Tabs variant='soft-rounded' colorScheme='red'
          isFitted
          alignContent={"center"}
        >
          <TabList>
            <Tab textColor="aqua">Tab 1</Tab>
            <Tab textColor="aqua">tab 2</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <h1><BorrowBookReqList/></h1>
            </TabPanel>
            <TabPanel>
              <ReturnReq/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
  )
}

export default AdminPortal