/* eslint-disable @typescript-eslint/no-explicit-any */

export type MockedType<TMockedClass> = {
    [key in keyof TMockedClass]: TMockedClass[key] extends (...args: any) => any
        ? jest.Mock<
              ReturnType<TMockedClass[key]>,
              Parameters<TMockedClass[key]>
          >
        : any;
};

export const createMockService = <TMockedClass extends {}>(
    actualService: TMockedClass
): { service: TMockedClass; mock: MockedType<TMockedClass> } => {
    const serviceMock = (actualService as unknown) as MockedType<TMockedClass>;
    return { service: actualService, mock: serviceMock };
};

export default createMockService;
