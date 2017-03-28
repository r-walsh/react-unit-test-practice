import React from "react";
import test from "ava";
import { shallow } from "enzyme";
import chai, { expect } from "chai";
import chaiEnzyme from "chai-enzyme";

chai.use( chaiEnzyme() );

import List from "./List";

test( "dummy test", t => t.pass() );
