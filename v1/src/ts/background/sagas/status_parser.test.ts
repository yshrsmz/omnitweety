import test from "ava";

import parseStatus, { IParsedStatus } from "./status_parser";

test("short hand can be parsed", (t) => {
    const result = parseStatus("-ts test");

    t.deepEqual<IParsedStatus>(
        result,
        {
            options: false,
            share: true,
            slack: false,
            twitter: true,
            version: false,
            status: "test",
        });
});

test("multiple options can be parsed", (t) => {
    const result = parseStatus("--twitter --share test status");

    t.deepEqual<IParsedStatus>(
        result,
        {
            options: false,
            share: true,
            slack: false,
            twitter: true,
            version: false,
            status: "test status",
        },
    );
});

test("unknown options should be treated as a part of status", (t) => {
    const result = parseStatus("--twitter --share --unknown test status");

    t.deepEqual<IParsedStatus>(
        result,
        {
            options: false,
            share: true,
            slack: false,
            twitter: true,
            version: false,
            status: "--unknown test status",
        },
    );
});

test("unknown shorthand options should be treated as a part of status", (t) => {
    const result = parseStatus("-ts -u test status 123");

    t.deepEqual<IParsedStatus>(
        result,
        {
            options: false,
            share: true,
            slack: false,
            twitter: true,
            version: false,
            status: "-u test status 123",
        },
    );
});

test("unknown combined shorthand options should be ignored", (t) => {
    const result = parseStatus("-tsu test status 123");

    t.deepEqual<IParsedStatus>(
        result,
        {
            options: false,
            share: true,
            slack: false,
            twitter: true,
            version: false,
            status: "test status 123",
        },
    );
});

test("option-like string appeard in the middle of parameter should not treated as a option", (t) => {
    const result = parseStatus("-t test -s ssss");

    t.deepEqual<IParsedStatus>(
        result,
        {
            options: false,
            share: false,
            slack: false,
            twitter: true,
            version: false,
            status: "test -s ssss",
        },
    );
});

test("previous :share command can be recognized", (t) => {
    const result = parseStatus(":share test status　ああああ");

    t.deepEqual<IParsedStatus>(
        result,
        {
            options: false,
            share: true,
            slack: false,
            twitter: false,
            version: false,
            status: "test status　あああ",
        },
    );
});
