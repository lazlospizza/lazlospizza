/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "../common";

export interface LazlosPizzaShopInterface extends utils.Interface {
  functions: {
    "bakePizza(uint256[])": FunctionFragment;
    "bakePizzaPrice()": FunctionFragment;
    "bakeRandomPizza(uint256[],bytes)": FunctionFragment;
    "buyAndBakePizza(uint256[])": FunctionFragment;
    "buyIngredients(uint256[],uint256[])": FunctionFragment;
    "ingredientsContractAddress()": FunctionFragment;
    "owner()": FunctionFragment;
    "pizzaContractAddress()": FunctionFragment;
    "rebakePizza(uint256,uint256[],uint256[])": FunctionFragment;
    "rebakePizzaPrice()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setIngredientsContractAddress(address)": FunctionFragment;
    "setPizzaContractAddress(address)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "unbakePizza(uint256)": FunctionFragment;
    "unbakePizzaPrice()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "bakePizza"
      | "bakePizzaPrice"
      | "bakeRandomPizza"
      | "buyAndBakePizza"
      | "buyIngredients"
      | "ingredientsContractAddress"
      | "owner"
      | "pizzaContractAddress"
      | "rebakePizza"
      | "rebakePizzaPrice"
      | "renounceOwnership"
      | "setIngredientsContractAddress"
      | "setPizzaContractAddress"
      | "transferOwnership"
      | "unbakePizza"
      | "unbakePizzaPrice"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "bakePizza",
    values: [BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "bakePizzaPrice",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "bakeRandomPizza",
    values: [BigNumberish[], BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "buyAndBakePizza",
    values: [BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "buyIngredients",
    values: [BigNumberish[], BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "ingredientsContractAddress",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "pizzaContractAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "rebakePizza",
    values: [BigNumberish, BigNumberish[], BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "rebakePizzaPrice",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setIngredientsContractAddress",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "setPizzaContractAddress",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "unbakePizza",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "unbakePizzaPrice",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "bakePizza", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "bakePizzaPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "bakeRandomPizza",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "buyAndBakePizza",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "buyIngredients",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "ingredientsContractAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "pizzaContractAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "rebakePizza",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "rebakePizzaPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setIngredientsContractAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setPizzaContractAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "unbakePizza",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "unbakePizzaPrice",
    data: BytesLike
  ): Result;

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface LazlosPizzaShop extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: LazlosPizzaShopInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    bakePizza(
      tokenIds: BigNumberish[],
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    bakePizzaPrice(overrides?: CallOverrides): Promise<[BigNumber]>;

    bakeRandomPizza(
      tokenIds: BigNumberish[],
      signature: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    buyAndBakePizza(
      tokenIds: BigNumberish[],
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    buyIngredients(
      tokenIds: BigNumberish[],
      amounts: BigNumberish[],
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    ingredientsContractAddress(overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    pizzaContractAddress(overrides?: CallOverrides): Promise<[string]>;

    rebakePizza(
      pizzaTokenId: BigNumberish,
      ingredientTokenIdsToAdd: BigNumberish[],
      ingredientTokenIdsToRemove: BigNumberish[],
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    rebakePizzaPrice(overrides?: CallOverrides): Promise<[BigNumber]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setIngredientsContractAddress(
      addr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setPizzaContractAddress(
      addr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    unbakePizza(
      pizzaTokenId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    unbakePizzaPrice(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  bakePizza(
    tokenIds: BigNumberish[],
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  bakePizzaPrice(overrides?: CallOverrides): Promise<BigNumber>;

  bakeRandomPizza(
    tokenIds: BigNumberish[],
    signature: BytesLike,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  buyAndBakePizza(
    tokenIds: BigNumberish[],
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  buyIngredients(
    tokenIds: BigNumberish[],
    amounts: BigNumberish[],
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  ingredientsContractAddress(overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  pizzaContractAddress(overrides?: CallOverrides): Promise<string>;

  rebakePizza(
    pizzaTokenId: BigNumberish,
    ingredientTokenIdsToAdd: BigNumberish[],
    ingredientTokenIdsToRemove: BigNumberish[],
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  rebakePizzaPrice(overrides?: CallOverrides): Promise<BigNumber>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setIngredientsContractAddress(
    addr: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setPizzaContractAddress(
    addr: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  unbakePizza(
    pizzaTokenId: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  unbakePizzaPrice(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    bakePizza(
      tokenIds: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    bakePizzaPrice(overrides?: CallOverrides): Promise<BigNumber>;

    bakeRandomPizza(
      tokenIds: BigNumberish[],
      signature: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    buyAndBakePizza(
      tokenIds: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    buyIngredients(
      tokenIds: BigNumberish[],
      amounts: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    ingredientsContractAddress(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    pizzaContractAddress(overrides?: CallOverrides): Promise<string>;

    rebakePizza(
      pizzaTokenId: BigNumberish,
      ingredientTokenIdsToAdd: BigNumberish[],
      ingredientTokenIdsToRemove: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    rebakePizzaPrice(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    setIngredientsContractAddress(
      addr: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setPizzaContractAddress(
      addr: string,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    unbakePizza(
      pizzaTokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    unbakePizzaPrice(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
  };

  estimateGas: {
    bakePizza(
      tokenIds: BigNumberish[],
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    bakePizzaPrice(overrides?: CallOverrides): Promise<BigNumber>;

    bakeRandomPizza(
      tokenIds: BigNumberish[],
      signature: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    buyAndBakePizza(
      tokenIds: BigNumberish[],
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    buyIngredients(
      tokenIds: BigNumberish[],
      amounts: BigNumberish[],
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    ingredientsContractAddress(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    pizzaContractAddress(overrides?: CallOverrides): Promise<BigNumber>;

    rebakePizza(
      pizzaTokenId: BigNumberish,
      ingredientTokenIdsToAdd: BigNumberish[],
      ingredientTokenIdsToRemove: BigNumberish[],
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    rebakePizzaPrice(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setIngredientsContractAddress(
      addr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setPizzaContractAddress(
      addr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    unbakePizza(
      pizzaTokenId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    unbakePizzaPrice(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    bakePizza(
      tokenIds: BigNumberish[],
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    bakePizzaPrice(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    bakeRandomPizza(
      tokenIds: BigNumberish[],
      signature: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    buyAndBakePizza(
      tokenIds: BigNumberish[],
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    buyIngredients(
      tokenIds: BigNumberish[],
      amounts: BigNumberish[],
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    ingredientsContractAddress(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pizzaContractAddress(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    rebakePizza(
      pizzaTokenId: BigNumberish,
      ingredientTokenIdsToAdd: BigNumberish[],
      ingredientTokenIdsToRemove: BigNumberish[],
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    rebakePizzaPrice(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setIngredientsContractAddress(
      addr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setPizzaContractAddress(
      addr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    unbakePizza(
      pizzaTokenId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    unbakePizzaPrice(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}