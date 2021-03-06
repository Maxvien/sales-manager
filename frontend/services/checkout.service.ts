import _ from 'lodash';
import { gql } from 'apollo-boost';
import { Request, Response } from 'express';
import cookies from 'js-cookie';
import { actions } from '../stores';
import { shopify } from './apis.service';
import { CheckoutQueryVariables, CheckoutLineItemsReplaceMutationVariables } from '../types/shopify.type';

export const CHECKOUT_FRAGMENT = gql`
  fragment checkout on Checkout {
    id
    webUrl
    subtotalPriceV2 {
      amount
      currencyCode
    }
    totalTaxV2 {
      amount
      currencyCode
    }
    totalPriceV2 {
      amount
      currencyCode
    }
    lineItems(first: 250) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          id
          title
          variant {
            id
            title
            image {
              transformedSrc
            }
            priceV2 {
              amount
              currencyCode
            }
          }
          quantity
        }
      }
    }
  }
`;

const CHECKOUT_CREATE_MUTATION = gql`
  mutation checkoutCreate {
    checkoutCreate(input: {}) {
      checkout {
        id
      }
    }
  }
`;

const CHECKOUT_QUERY = gql`
  ${CHECKOUT_FRAGMENT}
  query checkout($checkoutId: ID!) {
    node(id: $checkoutId) {
      ... on Checkout {
        ...checkout
      }
    }
  }
`;

const CHECKOUT_LINE_ITEMS_REPLACE_MUTATION = gql`
  ${CHECKOUT_FRAGMENT}
  mutation checkoutLineItemsReplace($checkoutId: ID!, $lineItems: [CheckoutLineItemInput!]!) {
    checkoutLineItemsReplace(checkoutId: $checkoutId, lineItems: $lineItems) {
      checkout {
        ...checkout
      }
    }
  }
`;

export function get(req: Request, res: Response) {
  return async dispatch => {
    try {
      dispatch(actions.checkout.getRequest());
      let { checkoutId } = req.cookies;

      if (!checkoutId) {
        const { data } = await shopify.mutate({ mutation: CHECKOUT_CREATE_MUTATION });
        checkoutId = data.checkoutCreate.checkout.id;
        res.cookie('checkoutId', checkoutId, { maxAge: 1000 * 60 * 60 * 24 * 7 }); // 7 days
      }

      const variables: CheckoutQueryVariables = {
        checkoutId
      };

      const { data } = await shopify.query({
        query: CHECKOUT_QUERY,
        variables
      });

      dispatch(actions.checkout.getSuccess({ data: data.node }));
    } catch (error) {
      dispatch(actions.checkout.getFailure({ error }));
    }
  };
}

export function replaceLineItems(variables: CheckoutLineItemsReplaceMutationVariables) {
  return async dispatch => {
    try {
      dispatch(actions.checkout.lineItemsReplaceRequest());

      const { data } = await shopify.mutate({
        mutation: CHECKOUT_LINE_ITEMS_REPLACE_MUTATION,
        variables
      });

      dispatch(
        actions.checkout.lineItemsReplaceSuccess({
          data: data.checkoutLineItemsReplace.checkout
        })
      );
    } catch (error) {
      dispatch(actions.checkout.lineItemReplaceFailure({ error }));
    }
  };
}

interface LineItem {
  variantId: string;
  quantity: number;
}

function getLineItems(lineItems): LineItem[] {
  return lineItems.map(({ node }): LineItem => ({ variantId: node.variant.id, quantity: node.quantity }));
}

export function addLineItem(variantId: string, quantity: number) {
  return async (dispatch, getState) => {
    const checkoutId = cookies.get('checkoutId');
    const lineItems = getLineItems(getState().checkout.data.lineItems.edges);
    const lineItemIndex = _.findIndex(lineItems, { variantId });

    if (lineItemIndex >= 0) {
      lineItems[lineItemIndex].quantity += quantity;
    } else {
      lineItems.push({ variantId, quantity });
    }

    dispatch(replaceLineItems({ checkoutId, lineItems }));
  };
}

export function updateQuantity(variantId: string, quantity: number) {
  return async (dispatch, getState) => {
    const checkoutId = cookies.get('checkoutId');
    const lineItems = getLineItems(getState().checkout.data.lineItems.edges);
    const lineItemIndex = _.findIndex(lineItems, { variantId });

    lineItems[lineItemIndex].quantity = quantity;

    dispatch(replaceLineItems({ checkoutId, lineItems }));
  };
}

export function removeLineItem(variantId: string) {
  return async (dispatch, getState) => {
    const checkoutId = cookies.get('checkoutId');
    let lineItems = getLineItems(getState().checkout.data.lineItems.edges);

    lineItems = _.remove(lineItems, lineItem => lineItem.variantId !== variantId);

    dispatch(replaceLineItems({ checkoutId, lineItems }));
  };
}
