use async_graphql::InputObject;
use linera_sdk::{ base:: {Amount, ChainId, ContractAbi, Owner, ServiceAbi}, graphql::GraphQLMutationRoot};
use serde::{Deserialize, Serialize};

pub struct ApplicationAbi;

impl ContractAbi for ApplicationAbi {
    type Operation = ();
    type Response = ();
}

impl ServiceAbi for ApplicationAbi {
    type Query = ();
    type QueryResponse = ();
}

#[derive (Debug, Deserialize, Serialize, GraphQLMutationRoot)]

pub enum Operation {
    Transfer {
        owner: Owner, 
        amount: Amount, 
        target_account: Account
    }
}

#[derive(
Clone, Copy, Debug, Deserialize, Eq, Ord, PartialEq, PartialOrd, Serialize, InputObject,
)]
pub struct Account {
    pub chain_id: ChainId, 
    pub owner: Owner
}