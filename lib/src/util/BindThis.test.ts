import { BindToClass } from "@derfrodo/frodo-s-little-helpers";

@BindToClass()
class TestClassBase {
    public val = "test";
    public fooBase(arg: number): string {
        if (this === undefined) {
            throw new Error("This is undefined");
        }
        const val = this.val;
        return `${val}_number_${arg}`;
    }
}

class TestClassExt1 extends TestClassBase {
    public foo(arg: number): string {
        if (this === undefined) {
            throw new Error("This is undefined");
        }
        const val = this.val;
        return `${val}_number_${arg}`;
    }
}

@BindToClass()
class TestClassExt2 extends TestClassExt1 {
    constructor() {
        super();
        this.val = "constructed";
    }

    public bar(x: number): string {
        if (this === undefined) {
            throw new Error("This is undefined");
        }
        const val = this.val;
        return `${val}_number_${x}`;
    }
}

describe("BindThis tests", () => {
    describe("TestClassExt2 tests: @Bind", () => {
        it("TestClassExt2 BindToClass foo shall fail since not bound", async () => {
            // arrange:
            const clazz = new TestClassExt2();
            const array = [1, 2];

            // act
            const result = expect(() => array.map(clazz.foo));

            // assert
            result.toThrowError(new Error("This is undefined"));
        });
        it("TestClassExt2 BindToClass foo shall not fail if lambda", async () => {
            // arrange:
            const clazz = new TestClassExt2();
            const array = [1, 2];

            // act
            const result = array.map((n) => clazz.foo(n));

            // assert
            expect(result).toEqual([
                "constructed_number_1",
                "constructed_number_2",
            ]);
        });
        it("TestClassExt2 BindToClass bar shall not fail since bound", async () => {
            // arrange:
            const clazz = new TestClassExt2();
            const array = [1, 2];

            // act
            const result = array.map(clazz.bar);

            // assert
            expect(result).toEqual([
                "constructed_number_1",
                "constructed_number_2",
            ]);
        });
        it("TestClassExt2 BindToClass fooBase shall not fail since bound", async () => {
            // arrange:
            const clazz = new TestClassExt2();
            const array = [1, 2];

            // act
            const result = array.map(clazz.fooBase);

            // assert
            expect(result).toEqual([
                "constructed_number_1",
                "constructed_number_2",
            ]);
        });
    });
});
