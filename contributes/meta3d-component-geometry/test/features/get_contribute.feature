Feature: Get Contribute
    As a Get Contribute
    I want to get geometry data
    So that I can register it

    Scenario: componentName
        When I get contribute
        Then componentName should be "Geometry"

    Scenario: set config
        When I get contribute
        And create a state with config
        Then the config is setted

    Scenario: create dataoriented data
        When I get contribute
        And create a state with geometryPointCount, geometryCount
        Then dataoriented data is created based on geometryPointCount, geometryCount

    Scenario: create a geometry
        When I get contribute
        And create a state
        Then createComponentFunc should create a geometry

    Scenario: add a geometry to a gameObject
        Given create a gameObject
        When I get contribute
        And create a state
        And create a geometry
        And add the geometry to the gameObject
        Then get the gameObject's geometry should be the added one

    Scenario: add a geometry to a gameObject which alreay has one
        Given create a gameObject
        When I get contribute
        And create a state
        And create two geometries
        And add the first geometry to the gameObject
        And add the second geometry to the gameObject
        Then get the gameObject's geometry should be the second one

    Scenario: remove a geometry from a gameObject
        Given create a gameObject
        When I get contribute
        And create a state
        And create a geometry
        And add the geometry to the gameObject
        And remove the geometry from the gameObject
        Then the gameObject shouldn't has the geometry

    Scenario: remove a geometry which add to two gameObjects from a gameObject
        Given create two gameObject as g1, g2
        When I get contribute
        And create a state
        And create a geometry
        And add the geometry to g1
        And add the geometry to g2
        And remove the geometry from g1
        Then g1 shouldn't has the geometry
        And g2 should has the geometry

    Scenario: get need disposed geometrys
        Given create two gameObject as g1, g2
        When I get contribute
        And create a state
        And create three geometrys as geo1, geo2, geo3
        And add geo1 to g1
        And add geo3 to g2
		And defer dispose geo1 from g1
		And defer dispose geo1 from g1
		And defer dispose geo3 from g2
        Then get need disposed geometrys should return [[geo1, g1], [geo3, g2]]

    Scenario: get all geometries
        Given create two gameObjects
        When I get contribute
        And create a state
        And create two geometries
        And add them to the gameObjects one by one
        Then getAllComponentsFunc should get the two geometries

    Scenario: judge whether a gameObject has a geometry
        Given create a gameObject
        When I get contribute
        And create a state
        And create a geometry
        And add the geometry to the gameObject
        Then hasComponentFunc should return true

    Scenario: get a geometry's gameObjects
        Given create two gameObjects
        When I get contribute
        And create a state
        And create a geometry
        And add the geometry to the two gameObjects
        Then getGameObjectsFunc should return the two gameObjects

    Scenario Outline: get indices's count
        When I get contribute
        And create a state
        And create a geometry
        And set geometry's indices to <I1> , <I2>, <I3>
        Then get geometry's indices's count should return <C>

        Examples:
            | I1 | I2 | I3 | C |
            | 1  | 2  | 3  | 3 |

    Rule: operate geometry's vertex data

        Background: prepare contribute
            When I get contribute
            And create a state
            And create a geometry

        Scenario: operate vertices
            When set geometry's vertices
            Then get geometry's vertices should return the setted data

        Scenario: operate normals
            When set geometry's normals
            Then get geometry's normals should return the setted data

        Scenario: operate texCoords
            When set geometry's texCoords
            Then get geometry's texCoords should return the setted data


        Scenario: operate tangents
            When set geometry's tangents
            Then get geometry's tangents should return the setted data

        Scenario: operate indices
            When set geometry's indices
            Then get geometry's indices should return the setted data

    Rule: judge whether has geometry's vertex data

        Scenario: not has vertices
            When I get contribute
            And create a state
            And create a geometry
            Then geometry should not has vertices

        Scenario: has vertices
            When I get contribute
            And create a state
            And create a geometry
            And set geometry's vertices
            Then geometry should has vertices

        Scenario: has indices
            When I get contribute
            And create a state
            And create a geometry
            And set geometry's indices
            Then geometry should has indices

    Rule: operate geometry's vertex data error case

        Background: prepare contribute
            Given open debug
            When I get contribute

        Scenario Outline: texCoords should in [0.0, 1.0]
            When create a state
            And create a geometry
            Then set geometry's texCoords to <X>, <Y> which not in range should throw error message: "expect texCoords in [0.0, 1.0]"

            Examples:
                | X    | Y   |
                | 1.   | 2.  |
                | -0.1 | 0.5 |

        Scenario: set enough vertices
            When create a state with geometryPointCount:2
            And create a geometry
            Then set geometry's vertices with 2 vertex data should not throw error

        Scenario: set too many vertices
            When create a state with geometryPointCount:2
            And create a geometry
            Then set geometry's vertices with 3 vertex data should throw error

        Scenario: set too many indices
            When create a state with geometryPointCount:2
            And create a geometry
            Then set geometry's indices with 1 indices should throw error

    Rule: create geometry error case

        Scenario: create too many geometries
            Given open debug
            When I get contribute
            And create a state with geometryCount:1
            Then create two geometries should contract error