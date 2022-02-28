Feature: Get Contribute
    As a Get Contribute
    I want to get transform contribute
    So that I can register it

    Scenario: componentName
        When I get contribute
        Then componentName should be "Transform"

    Scenario: set config
        When I get contribute
        And create a state with config
        Then the config is setted

    Scenario: create dataoriented contribute
        When I get contribute
        And create a state with transformCount
        Then dataoriented contribute is created based on transformCount

    Scenario: create a transform
        When I get contribute
        And create a state
        Then createComponentFunc should create a transform
        And mark the transform dirty
        And set the transform's children to empty

    Scenario: add a transform to a gameObject
        Given create a gameObject
        When I get contribute
        And create a state
        And create a transform
        And add the transform to the gameObject
        Then get the gameObject's transform should be the added one

    Scenario: add a transform to a gameObject which alreay has one
        Given create a gameObject
        When I get contribute
        And create a state
        And create two transforms
        And add the first transform to the gameObject
        And add the second transform to the gameObject
        Then get the gameObject's transform should be the second one

    Scenario: get all transforms
        Given create two gameObjects
        When I get contribute
        And create a state
        And create two transforms
        And add them to the gameObjects one by one
        Then getAllComponentsFunc should get the two transforms

    Scenario: judge whether a gameObject has a transform
        Given create a gameObject
        When I get contribute
        And create a state
        And create a transform
        And add the transform to the gameObject
        Then hasComponentFunc should return true

    Scenario: get a transform's gameObject
        Given create a gameObject
        When I get contribute
        And create a state
        And create a transform
        And add the transform to the gameObject
        Then getGameObjectsFunc should return [gameObject]

    Rule: get transform's default contribute

        Background: prepare contribute
            When I get contribute
            And create a state
            And create a transform

        Scenario: get default position
            Then get transform's position should return default contribute

        Scenario: get default rotation
            Then get transform's rotation should return default contribute

        Scenario: get default scale
            Then get transform's scale should return default contribute

        Scenario: get default euler angles
            Then get transform's euler angles should return default contribute
