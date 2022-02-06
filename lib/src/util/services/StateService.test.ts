import {
    StatePropertyInfo,
    STATE_PROPERT_TYPES
} from "../../interfaces/StateInterfaceInfo";
import { StateService } from "./StateService";

describe("StateService tests", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe("StateService.getInitialPropertyValue tests", () => {
        describe.each<[STATE_PROPERT_TYPES[], string]>([
            [[STATE_PROPERT_TYPES.STRING], '""'],
            [[STATE_PROPERT_TYPES.NUMBER], "0"],
            [[STATE_PROPERT_TYPES.ARRAY], "[]"],
            [[STATE_PROPERT_TYPES.BOOLEAN], "false"],
            [[STATE_PROPERT_TYPES.STRING, STATE_PROPERT_TYPES.NUMBER], '""'],
            [[STATE_PROPERT_TYPES.NUMBER, STATE_PROPERT_TYPES.STRING], "0"],
            [[STATE_PROPERT_TYPES.ARRAY, STATE_PROPERT_TYPES.NUMBER], "[]"],
            [
                [STATE_PROPERT_TYPES.BOOLEAN, STATE_PROPERT_TYPES.NUMBER],
                "false",
            ],
        ])(
            "StateService.getInitialPropertyValue tests for types %s",
            (types, expected) => {
                it(`when no null or undefined then getInitialPropertyValue returns "${expected}"`, async () => {
                    // arrange:
                    const data: StatePropertyInfo = {
                        name: "testprop",
                        nullable: false,
                        undefineable: false,
                        types: types,
                        typesText: "unknown",
                        arrayElementType: "unknown",
                    };

                    const uut = new StateService();

                    // act
                    const result = uut.getInitialPropertyValue(data);

                    // assert
                    expect(result).toBe(expected);
                });

                it(`when no nullable then getInitialPropertyValue returns null`, async () => {
                    // arrange:
                    const data: StatePropertyInfo = {
                        name: "testprop",
                        nullable: true,
                        undefineable: false,
                        types: types,
                        typesText: "unknown",
                        arrayElementType: "unknown",
                    };

                    const uut = new StateService();

                    // act
                    const result = uut.getInitialPropertyValue(data);

                    // assert
                    expect(result).toBe("null");
                });
                it(`when no undefineable then getInitialPropertyValue returns undefined`, async () => {
                    // arrange:
                    const data: StatePropertyInfo = {
                        name: "testprop",
                        nullable: false,
                        undefineable: true,
                        types: types,
                        typesText: "unknown",
                        arrayElementType: "unknown",
                    };

                    const uut = new StateService();

                    // act
                    const result = uut.getInitialPropertyValue(data);

                    // assert
                    expect(result).toBe("undefined");
                });
                it(`when no undefineable and nullable then getInitialPropertyValue returns undefined`, async () => {
                    // arrange:
                    const data: StatePropertyInfo = {
                        name: "testprop",
                        nullable: true,
                        undefineable: true,
                        types: types,
                        typesText: "unknown",
                        arrayElementType: "unknown",
                    };

                    const uut = new StateService();

                    // act
                    const result = uut.getInitialPropertyValue(data);

                    // assert
                    expect(result).toBe("undefined");
                });
            }
        );

        it("StateService.getInitialPropertyValue returns nothing", async () => {
            // arrange:
            const data: StatePropertyInfo = {
                name: "testprop",
                nullable: false,
                undefineable: false,
                types: [],
                typesText: "unknown",
                arrayElementType: "unknown",
            };

            const uut = new StateService();

            // act
            const result = (): string => uut.getInitialPropertyValue(data);

            // assert
            expect(result).toThrowError(
                /Failed to resolve initial value for property testprop/
            );
        });
    });
});
