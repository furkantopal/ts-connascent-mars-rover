import {Direction} from "../model/Direction";
import {ICommand} from "../commands/ICommand";
import {TurnLeftCommand} from "../commands/TurnLeftCommand";
import {MoveForwardCommand} from "../commands/MoveForwardCommand";
import {TurnRightCommand} from "../commands/TurnRightCommand";
import {InitializationCommand} from "../commands/InitializationCommand";
import {Coordinate} from "../model/Coordinate";
import {Position} from "../model/Position";
import {StartingPositionCommand} from "../commands/StartingPositionCommand";

export class CommandInterpreter {
    private letterToDirection: Map<string, Direction> = new Map([
        ["N", Direction.NORTH()],
        ["E", Direction.EAST()],
        ["S", Direction.SOUTH()],
        ["W", Direction.WEST()]
    ]);

    translate(commands: string): Array<ICommand> {
        let allCommands = new Array<ICommand>();
        let [size, starting, movements] = this.parseCommands(commands);
        allCommands.push(this.getInitializationCommand(size));
        allCommands.push(this.getStartingPositionCommand(starting));
        allCommands.push(...this.getMovementCommands(movements));

        return allCommands;
    }

    private parseCommands(commands: string): string[] {
        return commands.split("\n");
    }

    private getMovementCommands(commands: string): ICommand[] {
        let movementCommands = new Array<ICommand>();
        for (let command of Array.from(commands)) {
            switch (command) {
                case 'L':
                    movementCommands.push(new TurnLeftCommand());
                    break;
                case 'F':
                    movementCommands.push(new MoveForwardCommand());
                    break;
                case 'R':
                    movementCommands.push(new TurnRightCommand());
                    break;
            }
        }
        return movementCommands;
    }

    private getInitializationCommand(commands: string): InitializationCommand {
        let [width, height] = commands.split(" ");
        return new InitializationCommand(new Coordinate(parseInt(width), parseInt(height)));
    }

    private getStartingPositionCommand(commands: string): StartingPositionCommand {
        let [startX, startY, startDirection] = commands.split(" ");
        let coordinate: Coordinate = new Coordinate(parseInt(startX), parseInt(startY));
        let direction: Direction = <Direction>this.letterToDirection.get(startDirection);
        let position: Position = new Position(coordinate.x, coordinate.y, direction);
        return new StartingPositionCommand(position);
    }


}